<script setup lang='ts'>
import { useToast } from '@/components/ui/toast/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
const { toast } = useToast()

enum State {
  Idle,
  Processing,
  Done,
  Error
}

interface Download {
  url: string,
  id: string,
  title: string,
  state: State,
  userDownloaded: boolean
}

const url = ref('')
const state = ref<State>(State.Idle)
const downloads = ref<Download[]>([])

const eventConn = ref<undefined | EventSource>(undefined)
async function handleClick() {
  if (url.value.length === 0) {
    toast({ description: 'Please, paste the desired video Url' });
    return
  }

  state.value = State.Processing

  try {
    const res: Download = await $fetch<Download>('/api/download', {
      method: 'POST',
      body: JSON.stringify({ url: url.value }),
      credentials: 'include'
    })
    toast({ description: 'Your download is being processed.' });

    downloads.value.push(res)

    url.value = ''
    if (!eventConn.value) {
      eventConn.value = new EventSource("/api/notify", {
        withCredentials: true
      });
      eventConn.value.onmessage = function (event) {
        const updatedDownload: Download = JSON.parse(event.data)['data']

        const downloadIndex = downloads.value.findIndex(download => download.id === updatedDownload.id)
        downloads.value[downloadIndex] = {
          ...downloads.value[downloadIndex],
          ...updatedDownload
        }
        toast({ description: `Download ready ${downloads.value[downloadIndex].title}.` });
      };
    }
  } catch (e) {
    toast({ description: "Error. Your download could not be processed", variant: 'destructive' });
  } finally {
    state.value = State.Idle
  }
}


async function triggerDownload(download: Download) {
  try {
    const url = `/api/download/${download.id}`;
    const response = await fetch(url);
    const blob = await response.blob();

    const urlBlob = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = download?.title ?? 'your_download.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlBlob);
    download.userDownloaded = true
  } catch (e) {
  }
}

const availableDownloads = computed(() => {
  return downloads.value.filter(download => !download.userDownloaded)
})

const completedDownloads = computed(() => {
  return downloads.value.filter(download => download.userDownloaded)
})
</script>


<template>
  <div class="bg-mesh relative">

    <div class="bg-white/50 min-h-screen py-80">
      <div class="flex flex-col items-center px-4  mb-20">

        <div class="relative">
          <h1 class="z-20 font-pacifico text-6xl p-4 text-center font-bold mb-5 
            text-white
            ">
            Download Music from Youtube
          </h1>

          <h1 class="absolute top-0 right-0 -translate-x-1 -translate-y-1 font-pacifico text-6xl p-4 text-center font-bold mb-5
          from-fuchsia-400 via-indigo-500 to-emerald-500
          bg-gradient-to-r 
          bg-clip-text text-transparent">
            Download Music from Youtube
          </h1>
        </div>

        <section class="flex flex-col sm:flex-row gap-4 text-xl px-4">
          <input v-model="url" :disabled="state !== State.Idle" class="sm:min-w-96 px-3 py-3 text-lg font-bold rounded-lg border transition-all hover:border-purple-400 focus:outline focus:outline-2 
            focus:outline-purple-400 focus:outline-offset-0 bg-white text-[#444444]  border-[#cccccc]"
            placeholder="Paste link here">
          <button @click="handleClick" :disabled="state !== State.Idle"
            :class="{ 'cursor-not-allowed bg-white text-white': (state == State.Processing) }" class="px-8 py-4  font-bold rounded-lg border 
            focus:outline relative focus:outline-2 focus:outline-offset-2 
            bg-purple-200 text-black focus:outline-[#aaaaaa] border-[#cccccc]">
            <div class="loader" v-if="state === State.Processing"></div>
            Download
          </button>
        </section>
      </div>

      <Tabs default-value="active" class="w-1/2 mx-auto ">
        <TabsList>
          <TabsTrigger value="active">
            Downloads ({{ availableDownloads.length }})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({{ completedDownloads.length }})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" class="">
          <ul class="flex flex-col gap-2">
            <li class="my1 flex flex-col items-center gap-8 rounded py-3 px-6 bg-white shadow-md"
              v-for="download in availableDownloads" :key="download.id">
              <div class="text-ellipsis max-w96 text-slate-800">
                {{ download.title }}
                <!-- {{ download.userDownloaded }} -->
              </div>

              <button class="min-w-36 inline-flex items-center gap-2 justify-center p-3 rounded shadow bg-white"
                v-if="download.state === State.Processing">
                <Pulser />
                Processing
              </button>

              <button class="p-3 rounded bg-white inline-flex gap-2 items-center" @click="triggerDownload(download)"
                v-else-if="download.state === State.Done">
                <svg class="h-10 w-10" width="800" height="800" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path opacity=".5"
                    d="M22 16v-1c0-2.828 0-4.242-.879-5.12C20.242 9 18.828 9 16 9H8c-2.829 0-4.243 0-5.122.88C2 10.757 2 12.17 2 14.997V16c0 2.829 0 4.243.879 5.122C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.878C22 20.242 22 18.829 22 16Z"
                    fill="#1C274C" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 1.25a.75.75 0 0 0-.75.75v10.973l-1.68-1.961a.75.75 0 1 0-1.14.976l3 3.5a.75.75 0 0 0 1.14 0l3-3.5a.75.75 0 1 0-1.14-.976l-1.68 1.96V2a.75.75 0 0 0-.75-.75Z"
                    fill="#1C274C" />
                </svg>
                Download
              </button>

            </li>
          </ul>
        </TabsContent>

        <TabsContent value="completed">
          <ul class="flex flex-col gap-2">
            <li class="my1 flex flex-col items-center gap-3 rounded py-3 px-6 bg-white shadow-md"
              v-for="download in completedDownloads" :key="download.id">
              <div class="text-ellipsis max-w96 text-slate-800">
                {{ download.title }}
              </div>

              <button class="min-w-36 inline-flex items-center gap-2 justify-center p-3 rounded shadow bg-white"
                v-if="download.state === State.Error">
                <!-- <Pulser /> -->
                Failed
              </button>

              <button class="p-3 rounded bg-white inline-flex gap-2 items-center" @click="triggerDownload(download)"
                v-else-if="download.state === State.Done">
                <svg class="h-6 w-6 text-green-500" width="800" height="800" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m5 14 3.233 2.425a1 1 0 0 0 1.374-.167L18 6" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" />
                </svg>
                Download
              </button>

            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<style>
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}

.loader:before {
  animation: before8 2s infinite;
}

.loader:after {
  animation: after6 2s infinite;
}

@keyframes before8 {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 0, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }

  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
  }

  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
  }

  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}

@keyframes after6 {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }

  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
  }

  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
  }

  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}

.loader {
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
}
</style>
