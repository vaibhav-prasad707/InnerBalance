document.addEventListener("DOMContentLoaded", function() {

    //mood
    var moodImages = document.querySelectorAll(".mood-image");
    var moodCounts = {};
    var totalMoodCount = 0;
    var totalMoodCountElement = document.getElementById("total-mood-count");
    var moodHistory = document.getElementById("mood-list");
    var moodChart;

    moodImages.forEach(function(image) {
        var mood = image.getAttribute("data-mood");
        moodCounts[mood] = 0;

        var countElement = document.createElement("span");
        countElement.className = "mood-count";
        countElement.textContent = "0";
        image.insertAdjacentElement("afterend", countElement);

        image.addEventListener("click", function() {
            var selectedMood = this.getAttribute("data-mood");
            moodCounts[selectedMood]++;
            updateCount(selectedMood);
            trackMood(selectedMood);
            updateTotalCount();
            updateChart();
        });

        
    });

    function updateCount(mood) {
        var countElement = document.querySelector(".mood-image[data-mood='" + mood + "'] + .mood-count");
        countElement.textContent = moodCounts[mood];
    }

    function trackMood(selectedMood) {
        var li = document.createElement("li");
        li.textContent = selectedMood + " (" + moodCounts[selectedMood] + ")";
        moodHistory.appendChild(li);
    }

    function updateTotalCount() {
        totalMoodCount = Object.values(moodCounts).reduce((total, count) => total + count, 0);
        totalMoodCountElement.textContent = "Total Mood Count: " + totalMoodCount;
    }

    function updateChart() {
        var labels = Object.keys(moodCounts);
        var data = Object.values(moodCounts);

        if (!moodChart) {
            var ctx = document.getElementById("mood-chart").getContext("2d");
            moodChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Mood Count",
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
            moodChart.data.labels = labels;
            moodChart.data.datasets[0].data = data;
            moodChart.update();
        }
    }

});

    
