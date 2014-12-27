var net = require('net')

angular.module('doubanfm', []).controller('Doubanfm', ['$scope', function ($scope) {
  var client = new net.Socket(),
      handler = {
        song: function (song) {
          console.log(song)
        },
        channels: function (channels) {
          console.log(channels)
        }
      }

  client.connect(1234, 'localhost', function () {
    client.write('song\nchannels')
  })

  client.on('data', function (data) {
    String(data).split('\n').forEach(function (row) {
      if (row) {
        row = JSON.parse(row)
        if (row.length == 1) {
          handler[row[0]]()
        } else {
          handler[row[0]](row[1])
        }
      }
    })
  })

}])
