const chartColorsList = [];

for (let k = 1; k <= 32; k++) {
    if (k <= 16) {
        chartColorsList.push('rgb(' + (128 + k * 8 - 1) + ', ' + (k * 16 - 1) + ', ' + k * 3 + ')');
    } else {
        chartColorsList.push('rgb(' + ((32 - k) * 16 - 1) + ', ' + (128 + (32 - k) * 8 - 1) + ', ' + k * 3 + ')');
    }
}


(function($) {

    $.fn.validator = function() {
        $(this).each(function() {
            const input = $(this);
            input.on("input keydown keyup mousedown mouseup select contextmenu drop", function(event) {

            });
        });
    };


    let myMap, resultItem, resultsBlock, clusterer, searchResult = [];
    let mapCenter, placemark, searchControl;

    let searchFormRequest = {};
    const calculateFormRequest = {};

    $(() => {
        const header = $('#header');
        const checkScroll = () => {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (header.is('.scrolled') && (scrolled < 50)) {
                header.removeClass('scrolled');
            } else if (!header.is('.scrolled') && (scrolled > 50)) {
                header.addClass('scrolled');
            }
        };
        window.onscroll = () => {
            checkScroll();
        };
        checkScroll();
        resultItem = $($('#result-item-tpl').html());
        resultsBlock = $('#visible-results');
    });


    // Вычисление времени до метро
    const checkMetroDuration = () => {
        window['ymaps'].geocode(mapCenter, { kind: 'metro' }).then((res) => {
            const nearest = res.geoObjects.get(0);
            const multiRouteModel = new window['ymaps'].multiRouter.MultiRouteModel([
                mapCenter,
                nearest.geometry.getCoordinates()
            ], {
                routingMode: 'pedestrian'
            });
            multiRouteModel.events.add("requestsuccess", () => {
                const routes = multiRouteModel.getRoutes();
                calculateFormRequest.time_to_metro = Math.round(routes[0].properties.get("duration").value / 60);
            });
        });
    };

    // Установка маркера для формы расчета стоимости
    const setMarkerPosition = (coo) => {

        if (!placemark) {
            placemark = new window['ymaps'].Placemark(mapCenter, {}, {
                preset: 'islands#redIcon'
            });
            myMap.geoObjects.add(placemark);
        }

        window['ymaps'].geocode(coo).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            const address = firstGeoObject.getAddressLine();
            $('#addressString').text(address);
            $('#addressStringField').val(address);
        });

        placemark.geometry.setCoordinates(coo);
        $('#calculate_form_lat').val(coo[0]);
        $('#calculate_form_lng').val(coo[1]);
        checkMetroDuration()
    };

    // Изменение координат маркера
    const iniMarkerPosition = (event) => {
        setMarkerPosition(event.get('coords'));
    };




    const showResultPage = function(searchResult) {

        searchResult.flats.forEach((oneResultItem) => {

            const resultItemElement = resultItem.clone();
            oneResultItem.price_per_m = Math.round((oneResultItem.price / oneResultItem.full_sq));

            if (oneResultItem.metros && oneResultItem.metros.length) {
                oneResultItem.metro = oneResultItem.metros[0].station;
                oneResultItem.time_to_metro = oneResultItem.metros[0].time_to_metro;
            } else {
                oneResultItem.metro = undefined;
                oneResultItem.time_to_metro = undefined;
                oneResultItem.metro_hidden = "true";
            }

            for (let param in oneResultItem) {
                let visParam;
                if (param === 'price' || param === 'price_per_m' || param === 'profit') {
                    visParam = 'visible_' + param;
                } else {
                    visParam = param;
                }
                const valElement = resultItemElement.is('[data-' + visParam + ']') ? resultItemElement : resultItemElement.find('[data-' + visParam + ']');

                if (valElement.length) {

                    if (param === 'price' || param === 'price_per_m') {
                        oneResultItem[visParam] = oneResultItem[param].toLocaleString();
                    }

                    if (param === 'profit') {
                        oneResultItem[visParam] = Math.max(Math.round(oneResultItem[param] * 10), 1) / 10 + '%';
                    }

                    switch (valElement.data(visParam)) {
                        case 'text':
                            valElement.text(oneResultItem[visParam]);
                            break;
                        case 'background':
                            valElement.css({
                                backgroundImage: 'url(' + oneResultItem[visParam] + ')'
                            });
                            break;
                        default:
                            valElement.attr(valElement.data(visParam), oneResultItem[visParam]);
                    }
                }
            }
            resultsBlock.append(resultItemElement);
        })
    };


    $(() => {
        const results = $('#results');
        const emptyMsg = $('#empty-msg');
        const resultPrice = $('#result_price');
        const resultDuration = $('#result_duration');
        const chartDiv = $('#chartdiv');

        $('[data-validator]').validator();


        $('#search-init').on('click', () => {
            iniSearchForm();
        });
        $('#analyze-init').on('click', () => {
            iniAnalyzeForm();
        });

        $('input[name="city"]').on('change', (e) => {
            switch(e.target.value) {
                case 'MSK' :
                    myMap.setCenter([55.76, 37.64],12);
                    break;
                case 'SPB' :
                    myMap.setCenter([59.93, 30.31],12);
                    break;
                default :
                    myMap.setCenter([55.76, 37.64],12);
                    break;
            }
        })

        // Инициализация карты
        const init = () => {
            mapCenter = [55.76, 37.64];
            myMap = new window['ymaps'].Map("realty-map", {
                center: mapCenter,
                zoom: 15
            });
            searchControl = myMap.controls.get('searchControl');
            iniAnalyzeForm();
        };

        // Инициализация формы поиска выгодных предложений
        const iniSearchForm = () => {
            myMap.events.remove('click', iniMarkerPosition);
            searchControl.events.remove('resultselect', searchResultParse);
            myMap.geoObjects.remove(placemark);
            placemark = false;
            results.hide();
            emptyMsg.hide();
            $('#calculate_form_lat').val('');
            $('#calculate_form_lng').val('');
            $('#addressString').html('<span class="grey-text">Не указано</span>');
            $('#addressStringField').val('');
            clusterer ? myMap.geoObjects.add(clusterer) : clusterer;
        };

        // Инициализация формы расчета стоимости
        const iniAnalyzeForm = () => {
            searchControl.events.add('resultselect', searchResultParse);
            myMap.events.add('click', iniMarkerPosition);
            $('#search-form_error').hide();
            emptyMsg.hide();
            clusterer ? myMap.geoObjects.remove(clusterer) : false;
        };

        // Обработка запроса поиска
        const searchResultParse = (event) => {
            var index = event.get('index');
            searchControl.getResult(index).then(function (res) {
                setMarkerPosition(res.geometry.getCoordinates());
                searchControl.clear();
            });
        };

        window['ymaps'].ready(init);



        const createClusters = (data) => {
            var customItemContentLayout = window['ymaps'].templateLayoutFactory.createClass(
                '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
                '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
                '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
            );

            clusterer = new window['ymaps'].Clusterer({
                clusterIcons: [
                    {
                        href: 'static/images/icons/pin_maps.svg',
                        size: [64, 64],
                        offset: [-32, -20]
                    }
                ],
                clusterDisableClickZoom: true,
                clusterOpenBalloonOnClick: true,
                clusterBalloonPanelMaxMapArea: 0,
                clusterBalloonContentLayoutWidth: 500,
                clusterBalloonItemContentLayout: customItemContentLayout,
                clusterBalloonLeftColumnWidth: 220
            });

            myMap.geoObjects.add(clusterer);

            const placemarks = [];

            for (let k in data) {

                const resultItem = data[k];

                const pm = new window['ymaps'].Placemark([resultItem.latitude, resultItem.longitude], {
                    balloonContentHeader: data[k].address,
                    balloonContentBody:
                        data[k].price.toLocaleString() + ' ₽<br/>' +
                        '<a href="' + data[k].link + '" target="_blank">' + data[k].link + '</a>'
                    ,
                    balloonContentFooter: '<small style="color: #ddd">Smart Realty</small>'
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'static/images/icons/pin_maps.svg',
                    iconImageSize: [56, 56],
                    iconImageOffset: [-28, -28],
                    iconContentOffset: [15, 15]
                });

                resultItem.placemark = pm;
                placemarks.push(pm);
            }

            clusterer.add(placemarks);
        };

        const createSearchRequest = () => {
            const fields = $('input, select', searchForm);
            const values = {};
            fields.each(function() {
                const itemModel = $(this);
                const itemType = itemModel.attr('type');
                if (itemModel.attr('name')) {
                    switch (itemType) {
                        case 'radio':
                            values[itemModel.attr('name')] = itemModel.is(':checked') ? itemModel.val() : values[itemModel.attr('name')] || undefined;
                            break;
                        case 'checkbox':
                            values[itemModel.attr('name')] = itemModel.is(':checked') ? '1' : '0';
                            break;
                        default:
                            values[itemModel.attr('name')] = itemModel.val() || undefined;
                    }
                }
            });
            const convertedFormData = values;
            for (const k in convertedFormData) {
                searchFormRequest[k] = convertedFormData[k];
            }

            const mapInfo = myMap.getBounds();
            searchFormRequest['latitude_from'] = mapInfo[0][0];
            searchFormRequest['latitude_to'] = mapInfo[1][0];
            searchFormRequest['longitude_from'] = mapInfo[0][1];
            searchFormRequest['longitude_to'] = mapInfo[1][1];
        };


        const iniShowMoreResults = () => {
            let currentPage = 1;
            document.getElementById('show-more-button').onclick = () => {
                currentPage++;
                sendSearchForm(true, {
                    page: currentPage
                });
            };
        };

        const sendSearchForm = (notCreateData, addData) => {

            const searchResultsBlock = $('#results-list-block');
            searchResultsBlock.addClass('in-progress');

            myMap.geoObjects.remove(clusterer);

            if (!notCreateData) {
                searchResultsBlock.hide();
                resultsBlock.html('');
                createSearchRequest();
            }

            let requestData = {...searchFormRequest};
            if (addData) {
                requestData = $.extend(requestData, addData);
            }

            $('#search-form_error').hide();

            $.ajax({
                url: '/api/mean/',
                // url: 'static/test.json',
                data: requestData
            }).then((res) => {
                searchResultsBlock.show().removeClass('in-progress');
                $('#search-items-count').text(res['count']);
                if (res['max_page'] === res['page']) {
                    $('#show-more-button').hide();
                } else {
                    $('#show-more-button').show();
                }

                if (!notCreateData) {
                    searchResult = res['flats'];
                    iniShowMoreResults();
                    // createNavigation(res['max_page']);
                } else {
                    searchResult = searchResult.concat(res['flats']);
                }

                searchResultsBlock.removeClass('in-progress');
                if (res.flats.length) {
                    $('#visible-items-count').text(searchResult.length);
                    createClusters(searchResult);
                    showResultPage(res);
                }
            }, () => {
                $('#search-form_error').show();
            });
        };

        const searchForm = $('#search-form').on('submit', (event) => {
            event.preventDefault();
            sendSearchForm();
            return false;
        });

        const sendCalculateForm = () => {
            const fields = $('input, select', calculateForm);
            const values = {};

            fields.each(function() {
                const itemModel = $(this);
                const itemType = itemModel.attr('type');
                if (itemModel.attr('name')) {
                    switch (itemType) {
                        case 'checkbox':
                            values[itemModel.attr('name')] = itemModel.is(':checked') ? '1' : '0';
                            break;
                        default:
                            values[itemModel.attr('name')] = itemModel.val() || undefined;
                    }
                }
            });

            for (const k in values) {
                calculateFormRequest[k] = values[k];
            }

            results.hide();
            emptyMsg.hide();

            $.ajax({
                url: '/map',
                // url: 'static/plot-chart.json',
                data: calculateFormRequest
            }).then((res) => {
                const chartData = [];

                const allPeriod = res.PLot[res.PLot.length - 1]['x'];
                let latestValue = res.PLot.shift();

                const stepColor = allPeriod / chartColorsList.length;

                const allColors = chartColorsList.map((item) => {
                    return item;
                });

                let linesColor = allColors.shift();

                for (let k = latestValue['x']; k < allPeriod; k++) {
                    if (res.PLot[0].x === k) {
                        latestValue = res.PLot.shift();
                        if (latestValue['x'] / stepColor < res.PLot[0]['x'] / stepColor) {
                            linesColor = allColors.shift();
                        }
                    }
                    while(res.PLot[0].x <= k) {
                        res.PLot.shift();
                    }
                    if (latestValue['y'] !== 0) {
                        chartData.push({
                            x: k,
                            y: latestValue['y'],
                            lineColor: linesColor
                        });
                    }
                }

                if (res.Price) {
                    resultPrice.text(res.Price.toLocaleString() + ' руб.');
                    resultDuration.text(res.Duration ? res.Duration + ' дн.' : ' - ');
                    results.show();
                } else {
                    results.hide();
                }

                if (chartData.length) {
                    chartDiv.show();
                    chart.data = chartData;
                } else {
                    chartDiv.hide();
                    chart.data = [];

                    emptyMsg.show();
                }
            }, () => {
                emptyMsg.show();
                results.hide();
            });
        };

        const calculateForm = $('#calculate-form').on('submit', (event) => {
            event.preventDefault();
            sendCalculateForm();
            return false;
        });



        let chart;


        am4core.ready(function() {
            am4core.useTheme(am4themes_animated);
            chart = am4core.create("chartdiv", am4charts.XYChart);
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.ticks.template.disabled = true;
            categoryAxis.renderer.line.opacity = 0;
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.minGridDistance = 50;
            categoryAxis.dataFields.category = "x";
            categoryAxis.startLocation = 0.1;
            categoryAxis.endLocation = 0.6;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.line.opacity = 0;
            valueAxis.renderer.ticks.template.disabled = true;
            valueAxis.min = 0;

            var lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.categoryX = "x";
            lineSeries.dataFields.valueY = "y";
            lineSeries.tooltipText = "Цена: {valueY.value} руб.";
            lineSeries.fillOpacity = 0.8;
            lineSeries.strokeWidth = 1;
            lineSeries.propertyFields.stroke = "lineColor";
            lineSeries.propertyFields.fill = "lineColor";

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panX";
            chart.cursor.lineX.opacity = 0;
            chart.cursor.lineY.opacity = 0;

        });

    });







})(jQuery);
