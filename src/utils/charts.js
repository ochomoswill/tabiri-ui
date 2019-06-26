function hexToRGB(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


function sumArray(array) {
    return array.reduce((a, b) => a + b, 0)
}

const DoughnutChartData = {
    type: 'doughnut',
    labels: [
        'Active Births',
        'Born Dead',
    ],
    datasets: [{
        data: [300, 50],
        //data: data,
        backgroundColor: [
            '#80cbff',
            '#f8cbc0',
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
        ]
    }]
};
const PieChartData = {
    type: 'pie',
    labels: [
        'Single Births',
        'Twin Births',
        'Triplet Births'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#18ce0f',
            '#2ca8ff',
            '#f96332'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const buildBirthStateChartdData = (data) => {

    return {
        type: 'doughnut',
        labels: [
            'Active Births',
            'Born Dead',
        ],
        datasets: [{
            //data: [300, 50],
            data: data,
            backgroundColor: [
                '#3366cc',
                '#dc3912',
            ],
            hoverBackgroundColor: [
                '#3366cc',
                '#dc3912',
            ]
        }]
    };
};

const buildBirthTypeChartdData = (data) => {

    return {
        type: 'pie',
        labels: [
            'Single Births',
            'Twin Births',
            'Triplet Births',
            'Other'
        ],
        datasets: [{
            //data: [300, 50, 100],
            data: data,
            backgroundColor: [
                '#3366cc',
                '#dc3912',
                '#990099',
                '#109618'
            ],
            hoverBackgroundColor: [
                '#3366cc',
                '#dc3912',
                '#990099',
                '#109618'
            ]
        }]
    };
};


// ##############################
// // // Charts view - Bar Chart - Card
// #############################

const chartsBar1 = {
    data: (canvas) => {
        let ctx = canvas.getContext("2d");
        /*let gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, hexToRGB('#2a41e8', 0.6));*/
        return {
            labels: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ],
            datasets: [
                /*{
                    label: "Vaccine Demand",
                    backgroundColor:  "#2a41e8",
                    //backgroundColor: gradientFill,
                    borderColor: "#2a41e8",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#2a41e8",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    borderWidth: 1,
                    data: [400, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
                },*/
                {
                    label: "Vaccine Demand",
                    backgroundColor: "#18ce0f",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    label: "Total Births",
                    backgroundColor: "#2CA8FF",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        }
    },
    options: {
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Vaccine Demand Forecast for 2019',
            fontFamily: 'nunito',
        },
        legend: {
            display: true
        },
        tooltips: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
        },
        responsive: 1,
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Count',
                    fontFamily: 'nunito'
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawBorder: true
                },
                ticks:{
                    beginAtZero: true,
                    steps: 10,
                    max: 60
                }
            }],
            xAxes: [{
                ticks: {
                    display: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Months of Year',
                    fontFamily: 'nunito'
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: true,
                    display: true,
                    drawBorder: true
                },
            }]
        },
        layout: {
            padding: {left: 0, right: 0, top: 15, bottom: 15}
        }
    },
};
const chartsBar2 = {
    data: {
        labels: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Total Births",
                backgroundColor: "#18ce0f",
                data: [40, 26, 28, 45, 20, 25, 30, 25, 20, 25, 20, 15]
            },
            {
                label: "Total Live Births",
                backgroundColor: "#2CA8FF",
                data: [15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20]
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        /*tooltips: {
            bodySpacing: 10,
            mode:"nearest",
            intersect: 0,
            position:"nearest",
            xPadding:10,
            yPadding:10,
            caretPadding:10
        },
        responsive: 1,
        scales: {
            yAxes: [{
                gridLines: {
                    zeroLineColor: "transparent",
                    drawBorder: false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    drawBorder: false
                }
            }]
        },
        layout:{
            padding:{left:0,right:0,top:15,bottom:15}
        }*/
    }
};

const buildVaccineMetaDataBarChart = (rawData) => {
    return {
        data: (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));
            return {
                labels: [
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Total"
                ],
                datasets: [{
                    label: "Vaccinated Children (" + rawData[12] + ") ",
                    backgroundColor: gradientFill,
                    borderColor: "#2CA8FF",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#2CA8FF",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    borderWidth: 1,
                    data: rawData
                }]
            }
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: true
            },
            tooltips: {
                bodySpacing: 4,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            responsive: 1,
            scales: {
                yAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawBorder: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: true,
                        display: true,
                        drawBorder: true
                    }
                }]
            },
            layout: {
                padding: {left: 0, right: 0, top: 15, bottom: 15}
            }
        },
    }
};


const buildSingleBarChart = (rawData) => {
    return {
        data: (canvas) => {
            let ctx = canvas.getContext("2d");
            let gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
            gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
            gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));
            return {
                labels: [
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ],
                datasets: [{
                    label: "Vaccinated Children (" + sumArray(rawData) + ") ",
                    backgroundColor: gradientFill,
                    borderColor: "#2CA8FF",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#2CA8FF",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    borderWidth: 1,
                    data: rawData
                }]
            }
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: true
            },
            tooltips: {
                bodySpacing: 4,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            responsive: 1,
            scales: {
                yAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawBorder: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: true,
                        display: true,
                        drawBorder: true
                    }
                }]
            },
            layout: {
                padding: {left: 0, right: 0, top: 15, bottom: 15}
            }
        },
    }
};


const buildBirthBarGraph = (dataset1, dataSet2) => {
    return {
        data: {
            labels: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ],
            datasets: [
                {
                    label: "Total Births (" + sumArray(dataset1) + ") ",
                    backgroundColor: "#18ce0f",
                    data: dataset1
                },
                {
                    label: "Total Live Births (" + sumArray(dataSet2) + ") ",
                    backgroundColor: "#2CA8FF",
                    data: dataSet2
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: true
            },
            tooltips: {
                bodySpacing: 4,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            responsive: 1,
            scales: {
                yAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawBorder: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: true,
                        drawBorder: true
                    }
                }]
            },
            layout: {
                padding: {left: 0, right: 0, top: 15, bottom: 15}
            }
        }
    };
};


const buildVaccinatedBarGraph = (dataset1, dataSet2) => {
    return {
        data: {
            labels: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ],
            datasets: [
                {
                    label: "Total Vaccinated (" + sumArray(dataset1) + ") ",
                    backgroundColor: "#0099c6",
                    data: dataset1
                },
                {
                    label: "Total Vaccine Defaulters (" + sumArray(dataSet2) + ") ",
                    backgroundColor: "#ff9900",
                    data: dataSet2
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            legend: {
                display: true
            },
            tooltips: {
                bodySpacing: 4,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            responsive: 1,
            scales: {
                yAxes: [{
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawBorder: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: true
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: true,
                        drawBorder: true
                    }
                }]
            },
            layout: {
                padding: {left: 0, right: 0, top: 15, bottom: 15}
            }
        }
    };
};

export default {
    chartsBar1,
    chartsBar2, // Chart for Charts view - Bar Chart 2 - Card
    DoughnutChartData,
    PieChartData,
    buildBirthStateChartdData,
    buildBirthTypeChartdData,
    buildBirthBarGraph,
    buildVaccinatedBarGraph,
    buildSingleBarChart,
    buildVaccineMetaDataBarChart
};