# Design

## Flow to run code

แผนภาพแสดงลำดับเหตุการณ์ของระบบ Code Runner Service

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant B as Sandbox

    C->>+S: Send code to /run
    S->>B: Save code to file
    S->>+B: Run code

    break faile to run
    S-->>C: emit event "error"
    end

    loop untill process exit
      alt input from client to process
        C->>S: send inputs to event "stdin"
        S->>B: send client input to process "stdin"
      else output from process
        B-->>S: send process output to "stdout"
        S-->>C: resived outputs from event "stdout"
      else error from process
        B-->>S: send process error to "stderr"
        S-->>C: resived errors from event "stderr"
      end
    end


    B-->>-S: exit code
    S-->>-C: emit event "compleated"

```

ในขั้นตอนการรันโค้ด โดยอันดับแรก เมื่อไคลเอนต์ส่งโค้ดไปยังเซิร์ฟเวอร์ แล้วเซิร์ฟเวอร์จะทำการบันทึกโค้ดลงในไฟล์ เพื่อให้เซิร์ฟเวอร์รันโค้ดในสภาพแวดล้อมจำลองได้ แต่หากโค้ดไม่สามารถรันได้ เซิร์ฟเวอร์จะส่งเหตุการณ์ "error" กลับไปให้ผู้ใช้ได้รับทราบ มิฉะนั้น เซิร์ฟเวอร์จะรอรับส่ง อินพุท เอาพุท และ ข้อผิดพลาด ไปกลับระหว่างผู้ใช้ และสภาพแวดล้อมจำลอง จนกว่าโปรแกรมจะทำงานจบหลังจากนั้นเซิร์ฟเวอร์จะส่งเหตุการณ์ "completed" เพื่อแจ้งให้ผู้ใช้ได้รับทราบว่าโปรแกรมทำงานเสร็จสิ้นแล้ว
