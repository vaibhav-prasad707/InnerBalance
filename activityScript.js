document.addEventListener("DOMContentLoaded", function() {
    var activityImages = document.querySelectorAll(".activity-image");
    var activityCounts = {};
    var totalActivityCount = 0;
    var totalActivityCountElement = document.getElementById("total-activity-count");
    var activityHistory = document.getElementById("activity-list");
    var activityChart;

    activityImages.forEach(function(image) {
        var activity = image.getAttribute("data-activity");
        activityCounts[activity] = 0;

        var countElement = document.createElement("span");
        countElement.className = "activity-count";
        countElement.textContent = "0";
        image.insertAdjacentElement("afterend", countElement);

        image.addEventListener("click", function() {
            var selectedActivity = this.getAttribute("data-activity");
            activityCounts[selectedActivity]++;
            updateCount(selectedActivity);
            trackActivity(selectedActivity);
            updateTotalCount();
            updateChart();
        });
    });

    function updateCount(activity) {
        var countElement = document.querySelector(".activity-image[data-activity='" + activity + "'] + .activity-count");
        countElement.textContent = activityCounts[activity];
    }

    function trackActivity(selectedActivity) {
        var li = document.createElement("li");
        li.textContent = selectedActivity + " (" + activityCounts[selectedActivity] + ")";
        activityHistory.appendChild(li);
    }

    function updateTotalCount() {
        totalActivityCount = Object.values(activityCounts).reduce((total, count) => total + count, 0);
        totalActivityCountElement.textContent = "Total Activity Count: " + totalActivityCount;
    }

    function updateChart() {
        var labels = Object.keys(activityCounts);
        var data = Object.values(activityCounts);

        if (!activityChart) {
            var ctx = document.getElementById("activity-chart").getContext("2d");
            activityChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Activity Count",
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            activityChart.data.labels = labels;
            activityChart.data.datasets[0].data = data;
            activityChart.update();
        }
    }
});
