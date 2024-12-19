// Ambil elemen canvas
const ctx = document.getElementById('myChart').getContext('2d');

// Data untuk grafik (pendapatan dari Januari 2023 hingga Desember 2024)
const data = {
  labels: [
    'Januari 2023', 'Februari 2023', 'Maret 2023', 'April 2023', 'Mei 2023', 'Juni 2023',
    'Juli 2023', 'Agustus 2023', 'September 2023', 'Oktober 2023', 'November 2023', 'Desember 2023',
    'Januari 2024', 'Februari 2024', 'Maret 2024', 'April 2024', 'Mei 2024', 'Juni 2024',
    'Juli 2024', 'Agustus 2024', 'September 2024', 'Oktober 2024', 'November 2024', 'Desember 2024'
  ],
  datasets: [
    {
      label: 'Pendapatan (dalam juta)',
      data: [
        15, 18, 22, 24, 20, 19, 21, 23, 25, 28, 30, 35,  // Pendapatan 2023
        38, 40, 42, 45, 48, 50, 53, 56, 60, 63, 65, 70   // Pendapatan 2024
      ],
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // Warna latar belakang bar
      borderColor: 'rgba(75, 192, 192, 1)', // Warna border
      borderWidth: 1
    }
  ]
};

// Opsi untuk grafik
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
        callback: function(value) { return value + ' juta'; } // Menambahkan label satuan 'juta' pada y-axis
      }
    },
    x: {
      ticks: {
        maxRotation: 90, // Rotasi label sumbu X agar tidak tumpang tindih
        minRotation: 45
      }
    }
  }
};

// Buat grafik
const myChart = new Chart(ctx, {
  type: 'bar', // Jenis grafik: bar chart
  data: data,
  options: options
});

