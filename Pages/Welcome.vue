<template>
    <Head title="Welcome" />

    <div
        class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
    >
        <div
            v-if="canLogin"
            class="hidden fixed top-0 right-0 px-6 py-4 sm:block"
        >
            <Link
                v-if="$page.props.auth.user"
                :href="route('dashboard')"
                class="text-sm text-gray-700 underline"
            >
                Dashboard
            </Link>

            <template v-else>
                <Link
                    :href="route('login')"
                    class="text-sm text-gray-700 underline"
                >
                    Log in
                </Link>
            </template>
        </div>

        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div
                class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg"
            >
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <div
                        class="p-6 text-black border-gray-200 dark:border-gray-700 md:border-l"
                    >
                    <button @click="connectButton">Connect via Serial Port</button>
                    <button class="ml-10" @click="refreshButton">Refresh</button>

                    <div id="target"></div>
                    <p id="con">{{ con }}</p>
                    <p id="keepReading">{{ keepReading }}</p>
                    <p style="font-size:100px">scale: <span id="result">{{ parseInt(result)}} </span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
import { ref } from "@vue/reactivity";
import { onMounted,onBeforeUnmount } from "@vue/runtime-core";
import { scaleStore } from "@/Stores/scale";

const props = defineProps({
// bitsArray:Array,
canLogin: Boolean,
canRegister: Boolean,
laravelVersion: String,
phpVersion: String,
});
const store = scaleStore();

let con = null;
let keepReading = true;
let filtered = 0;
//let result = ref(0);
let port = null;
let buffer = new Uint8Array(8);
let bufferIndex = 0;
let intervalId = null;

onMounted(() => {
intervalId = setInterval(() => {
document.getElementById('con').innerText = `con: ${con}`;
document.getElementById('keepReading').innerText = `keepReading: ${keepReading}`;
document.getElementById('result').innerText = parseInt(store.result);
}, 100);
});

onBeforeUnmount(() => {
clearInterval(intervalId);
});


const connectButton = () => {
if (navigator.serial) {
  connectSerial();
} else {
  alert("Web Serial API not supported");
}
};

const ca = () => {
keepReading = true;
readData();
};

const connectSerial = async () => {
const log = document.getElementById("target");
port = await navigator.serial.requestPort();
await port.open({ baudRate: 9600 });
readData();
};

const readData = async () => {
let reader;
let textDecoder = new TextDecoder();

while (port.readable && keepReading) {
  reader = port.readable.getReader();
  filtered = "";

  try {
    while (keepReading) {
      const { value, done } = await reader.read();
      if (done) {
        keepReading = false;
        break;
      }

      console.log("index " + value.byteLength);

      if (bufferIndex + value.length > buffer.length) {
        bufferIndex = 0;
      }

      buffer.set(value, bufferIndex);
      filtered = textDecoder.decode(buffer);
     // result.value = filtered.toString().replace(/[^0-9]/g, "").slice(length);
     store.setResult(filtered.toString().replace(/[^0-9]/g, "").slice(length));

//console.log(result);
      bufferIndex += value.length;
    }

    keepReading = false;
  } catch (error) {
    // Handle error
  } finally {
    keepReading = false;
  }
  keepReading = false;
}
keepReading = false;
// console.log("serial close");
// await port.close();
};

const refreshButton = () => {
ca();
};
</script>
<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--tw-bg-opacity));
}

.border-gray-200 {
  border-color: #edf2f7;
  border-color: rgba(237, 242, 247, var(--tw-border-opacity));
}

.text-gray-400 {
  color: #cbd5e0;
  color: rgba(203, 213, 224, var(--tw-text-opacity));
}

.text-gray-500 {
  color: #a0aec0;
  color: rgba(160, 174, 192, var(--tw-text-opacity));
}

.text-gray-600 {
  color: #718096;
  color: rgba(113, 128, 150, var(--tw-text-opacity));
}

.text-gray-700 {
  color: #4a5568;
  color: rgba(74, 85, 104, var(--tw-text-opacity));
}

.text-gray-900 {
  color: #1a202c;
  color: rgba(26, 32, 44, var(--tw-text-opacity));
}

@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-800 {
      background-color: #2d3748;
      background-color: rgba(45, 55, 72, var(--tw-bg-opacity));
  }

  .dark\:bg-gray-900 {
      background-color: #1a202c;
      background-color: rgba(26, 32, 44, var(--tw-bg-opacity));
  }

  .dark\:border-gray-700 {
      border-color: #4a5568;
      border-color: rgba(74, 85, 104, var(--tw-border-opacity));
  }

  .dark\:text-white {
      color: #fff;
      color: rgba(255, 255, 255, var(--tw-text-opacity));
  }

  .dark\:text-gray-400 {
      color: #cbd5e0;
      color: rgba(203, 213, 224, var(--tw-text-opacity));
  }
}
</style>
