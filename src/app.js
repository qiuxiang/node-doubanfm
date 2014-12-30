var net = require('net')
  , port = require(process.env.HOME + '/.pydoubanfm/setting.json').port

angular.module('doubanfm', []).controller('Doubanfm', ['$scope', function ($scope) {
  var client = new net.Socket(),
      handler = {
        song: function (song) {
          console.log(song)
          $scope.album_cover = song.picture
          $scope.$apply()
        },
        channels: function (channels) {
          console.log(channels)
        }
      }

  client.connect(port, 'localhost', function () {
    client.write('song\nchannels')
  })

  client.on('data', function (data) {
    String(data).split('\n').forEach(function (row) {
      if (row) {
        row = JSON.parse(row)
        var func = handler[row[0]]
        if (func) {
          if (row.length == 1) {
            func()
          } else {
            func(row[1])
          }
        } else {
          console.log('handler \'' + row[0] + '\' not exist')
        }
      }
    })
  })
}])
