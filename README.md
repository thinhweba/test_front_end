### `npm install`
sau khi tải file về install để package cần thiết 
### `npm install -g json-server`
### `npx json-server --watch src/data-test.json --port 3004` (lệnh chạy api trên json sever)

### `npm start` (khởi chạy dự án)

### `thông tin cá nhân `
+ Phan Gia Thịnh 
+ gt05012003@gmail.com
+ 0899895251
### `thời gian hoàn thành test `
+ làm trong 2 ngày cụ thể là (12 tiếng)
+ bước đầu chỉ làm thao tác trên UI , nhưng sau đó thao tác hẵn trên API nên mất khá nhiều thời gian để nghiên cứu 
+ em cảm ơn công ty đã giành thời gian cho em , em hi vọng sẽ được vào công ty để học hỏi và phát triển bản thân , test 1 em viết trong này luôn ! 
+ Em xin cảm ơn 




### `câu 1`
export function rgb(r: number, g: number, b: number): string { 
// Your code here

r = Math.max(0,Math.min(255,Math.round(r)));
g = Math.max(0,Math.min(255,Math.round(g)));
b = Math.max(0,Math.min(255,Math.round(b)))
const hexValue  = `#${r.toString(16).padStart(2, ’ 0 ’ )}${g.toString(16).padStart(2, ‘0’)}${b.toString(16).padStart(2, ‘0‘)}`;
return hexValue.toUpperCase();
} 
