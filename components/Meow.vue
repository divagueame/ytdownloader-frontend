<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
</script>

<template>
  <div>
    <div class="bg-red-200 font-roboto">
      ROBOTO
    </div>
    <!-- <h1 class="bg-green-200 font-berk"> -->
    <h1 class="bg-yellow font-kurale">
      DFagule
    </h1>

    <h1 class="bg-primary-light font-kurale">
      OHTER FONT
    </h1>


    <h1 class="bg-primary-dark font-kurale">
      KURALE
    </h1>
  </div>

  <div class="font-lato">
    <Header />
    <div class="bg-red-200 font-roboto">
      ROBOTO
    </div>
    <h1 class="bg-main font-kurale">
      Main Default Color
    </h1>

    <h1 class="bg-main-light font-kurale">
      Main Light Color
    </h1>

    <h1 class="bg-main-dark font-kurale">
      Main Dark Color
    </h1>

    <h1 class="bg-yellow font-kurale">
      Yellow Default Color
    </h1>

    <h1 class="bg-yellow-light font-kurale">
      Yellow Light Color
    </h1>

    <h1 class="bg-yellow-dark font-kurale">
      Yellow Dark Color
    </h1>

    <h1 class="bg-clear font-kurale">
      Clear Default Color
    </h1>

    <h1 class="bg-clear-light font-kurale">
      Clear Light Color
    </h1>

    <h1 class="bg-clear-dark font-kurale">
      Clear Dark Color
    </h1>

    <h1 class="bg-back font-kurale">
      Back Default Color
    </h1>

    <h1 class="bg-back-light font-kurale">
      Back Light Color
    </h1>

    <h1 class="bg-back-dark font-kurale">
      Back Dark Color
    </h1>
  </div>

  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          New Window <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          New Incognito Window
        </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Share</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Email link</MenubarItem>
            <MenubarItem>Messages</MenubarItem>
            <MenubarItem>Notes</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>
          Print... <MenubarShortcut>⌘P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Undo <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Find</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Search the web</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Find...</MenubarItem>
            <MenubarItem>Find Next</MenubarItem>
            <MenubarItem>Find Previous</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>Cut</MenubarItem>
        <MenubarItem>Copy</MenubarItem>
        <MenubarItem>Paste</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
        <MenubarCheckboxItem checked>
          Always Show Full URLs
        </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarItem inset>
          Reload <MenubarShortcut>⌘R</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled inset>
          Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset>
          Toggle Fullscreen
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset>
          Hide Sidebar
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Profiles</MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup value="benoit">
          <MenubarRadioItem value="andy">
            Andy
          </MenubarRadioItem>
          <MenubarRadioItem value="benoit">
            Benoit
          </MenubarRadioItem>
          <MenubarRadioItem value="Luis">
            Luis
          </MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem inset>
          Edit...
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset>
          Add Profile...
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
  </div>

</template>
