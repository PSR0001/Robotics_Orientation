const URL = "http://localhost:5000/";


// Socket.io Code-->
const socket = io(URL);

let Data;

// client-side
 socket.on("connection", (data) => {
     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
     console.log(data);

 });


 let Data_Distance;
 //Chart- Data
 socket.on("Chart-Data", (data) => {
     console.log(data.distance);
     Data_Distance=data;
    console.log(Data_Distance)
 });
 
 socket.on("disconnect", () => {
     console.log(socket.id); // undefined
 });

 
/*---Chart JS code---*/
const showChart = () => {
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Distance',
          data: [10, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
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
  }

  showChart()
