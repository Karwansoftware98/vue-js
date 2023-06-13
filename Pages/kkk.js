import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const port = ref(null);
    const reader = ref(null);
    const receivedData = ref('');

    const connectToSerialPort = async () => {
      try {
        // Request access to the serial port
        const serialPort = await navigator.serial.requestPort();

        // Open the serial port
        await serialPort.open({ baudRate: 9600 });

        // Create a reader to read data from the serial port
        const serialReader = serialPort.readable.getReader();

        // Set up a loop to read incoming data in real-time
        while (true) {
          const { value, done } = await serialReader.read();
          if (done) {
            break;
          }
          // Convert the received data to a string and append it to the receivedData variable
          receivedData.value += new TextDecoder().decode(value);
        }

        console.log('Done reading data.');
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      connectToSerialPort();
    });

    onUnmounted(() => {
      // Clean up the serial port and reader objects
      if (reader.value) {
        reader.value.cancel();
        reader.value.releaseLock();
      }
      if (port.value) {
        port.value.close();
      }
    });

    return {
      receivedData,
    };
  },
};
