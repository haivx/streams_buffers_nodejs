# streams_buffers_nodejs
##1. Khái niệm Streams và buffer
a) Buffer là gì?
  - Là dữ liệu tạm thời (Bộ đệm) và thường được lưu trữ trong bộ nhớ tạm (RAM).
  - Là một vùng nhớ physical memory được dùng để làm vùng chứa data tạm thời trước khi chuyển đến một nơi khác.
  - Ví dụ khi bạn xem một đoạn video trực tuyến thì có hai cách để trình duyệt tải dữ liệu từ đoạn video này:
    - Tải toàn bộ dữ liệu của video rồi mới chạy
    - Tải từng phần của video và chạy từng phần nôi dung mỗi khi dữ liệu được tải về máy.<br>

    Với cách thứ hai thì từng phần dữ liệu video được tải về máy được gọi là buffer.

b) Khái niệm buffer trong Nodejs:

Javascript thuần xử lý tốt dữ liệu dưới dạng mã Unicode nhưng lại không hiệu quả khi xử lý dữ liệu nhị phân(binary data). Trên Browser thì điều này không là vấn đề khi data hầu hết ở dạng strings, tuy nhiên server Node khi xử lý TCP streams hay đọc - ghi file hệ thống đều làm việc với binary data.

Một trong những cách giải quyết là Node luôn xử lý mọi tác vụ với chuỗi nhị phân. Nhưng điều này khiến cho tốc độ xử lý process bị chậm. Bởi vì khi bạn làm việc với API đều xử lý qua strings, không phải binary data. Do đó Nodejs dùng buffer.

c) Streams là gì?

 Streams là một tập hợp của data - giống như những mảng hoặc chuỗi. Sự khác nhau ở chỗ streams không phải là một khối data và nó không được lưu trong bộ nhớ. Điều đó giúp streams được sử dụng hiệu quả khi làm việc với khối lượng data lớn hay những data nhận được từ các nguồn tài nguyên theo từng chunk theo thời gian.

 Trong Nodejs, Streams có 3 loại:
  - Readble: Stream được sử dụng cho hoạt động đọc
  - Writable: Stream được sử dụng cho hoạt động ghi dữ liệu
  - Duplex: Stream được sử dụng cho cả mục đích ghi và đọc<br><br>
  ![Hình minh họa cho Streams](https://github.com/haivx/streams_buffers_nodejs/blob/master/streams.png)

##2. Ví dụ:
a) Dùng streams để đọc file trong local
- Require hàm `fs`
```js
   var fs = require('fs')
```
- Sử dụng phương thức `createReadStream()` của đối tượng `fs` để tạo một stream dùng để đọc file. Tham số truyền vào là tên, đường dẫn file cần đọc:
```js
  var myReadStream = fs.createReadStream(__dirname +'/read.txt', 'utf8');
```
> Dùng `utf8` để khai báo nội dung file sẽ được encode theo mã định dạng utf8

b) Dùng streams để ghi file trong local
- Require hàm `fs`
```js
   var fs = require('fs')
```
- Sử dụng phương thức `createWriteStream()` của đối tượng `fs` để tạo một stream dùng để ghi file. Tham số truyền vào là tên, đường dẫn file cần ghi(Nếu chưa có file trong directory, node sẽ tự tạo một file và ghi nội dung vào đó):
```js
var myWriteStream = fs.createWriteStream(__dirname +'/write.txt', 'utf8');
```
> Dùng `utf8` để khai báo nội dung file sẽ được encode theo mã định dạng utf8. Nếu bỏ `utf8` thì kết quả sẽ là buffer

- Tạo sự kiện ghi file:
```js
myReadStream.on('data', function(chunk) {
  console.log('new chunk received:');
  console.log(chunk);
  console.log('chunk.length', chunk.length);
  myWriteStream.write(chunk)
})
```
> `myReadStream` là tên của phương thức đọc file bằng stream, `data` là giá trị default của phương thức.<br><br>
Câu hỏi đặt ra là kích thước của buffer tối đa là bao nhiêu?

- Có thể dùng phương thức `pipe()` để thay thế phương thức ghi file trên. Ưu điểm của phương thức này là:
  - Tránh hiện tượng slow client: Thông thường quá trình đọc file(request từ client gửi lên) sẽ nhanh hơn quá trình ghi file(response của server). Node là non-blocking I/O, mọi request lên server đều được xử lý ngay. Nếu connection từ server bị chậm lại vì lý do nào đó, lượng data server gửi về client sẽ bị dồn lại theo thời gian, do đó phương thức `pipe()` sẽ giúp cho data được `route` - `điều hướng` để giúp cho server hoạt động bình thường.
  - Code sẽ gọn hơn so với dùng cách khai báo event.
  
c) Dùng streams để đọc file và ghi file ra browser:
Tương tự với đọc file trên local, điều khác biệt ở đây data hay response sẽ là tham số được truyền vào phương thức ghi file `pipe()`
```js
    myReadStream.pipe(res);
```
###Thanks for watching!
