<script setup>
import { Link, router, useForm, usePage } from "@inertiajs/vue3";
import { computed, ref } from "vue";
import { useMainStore } from "@/Stores/main.js";
import { useStyleStore } from "@/Stores/style.js";
import { useLayoutStore } from "@/Stores/layout.js";
import {
    mdiForwardburger,
    mdiBackburger,
    mdiClose,
    mdiDotsVertical,
    mdiMenu,
    mdiClockOutline,
    mdiCloud,
    mdiCrop,
    mdiAccount,
    mdiCogOutline,
    mdiEmail,
    mdiLogout,
    mdiGithub,
    mdiThemeLightDark,
} from "@mdi/js";
import NavBarItem from "@/Components/NavBarItem.vue";
import NavBarItemLabel from "@/Components/NavBarItemLabel.vue";
import NavBarMenu from "@/Components/NavBarMenu.vue";
import BaseDivider from "@/Components/BaseDivider.vue";
import UserAvatarCurrentUser from "@/Components/UserAvatarCurrentUser.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
import NavBarSearch from "@/Components/NavBarSearch.vue";
import { useOnline } from "@vueuse/core";
// const form = useForm({
//     progress:''
// });
// router.on("progress", (event) => {
//     this.form.progress = event.detail.progress.percentage;
// });
const online = useOnline();

const mainStore = useMainStore();

const userName = computed(() => usePage().props.auth.user.name);

const styleStore = useStyleStore();

const toggleLightDark = () => {
    styleStore.setDarkMode();
};

const layoutStore = useLayoutStore();

const isMenuNavBarActive = ref(false);

const menuNavBarToggle = () => {
    isMenuNavBarActive.value = !isMenuNavBarActive.value;
};

const menuOpenLg = () => {
    layoutStore.isAsideLgActive = true;
};
</script>

<template>
    <nav
        class="top-0 left-0 right-0 fixed bg-gray-50 h-14 z-30 transition-position w-auto dark:bg-slate-800"

    >
        <div
            class="flex items-stretch"
            :class="[layoutStore.isRightFilter ? 'mr-60' : '']"
        >
            <div class="flex-1 items-stretch flex h-14">
                <NavBarItem type="flex" @click.prevent="menuOpenLg" label="h">
                    <BaseIcon :path="mdiMenu" size="24" />
                </NavBarItem>
            </div>
            <span
                class="flex h-3 w-3 lg:place-self-center relative right-1/4 top-6 lg:top-0 lg:right-0"
            >
                <span
                    class="absolute flex animate-bounce rounded-full h-5 w-5 -right-14 -top-4 bg-green-500"
                >
                </span>
                <!-- <span
                    class="absolute flex animate-ping rounded-full h-5 w-5 -right-14 -top-3 bg-green-100"
                >
                </span> -->
                <span class="relative text-green-500"
                    >{{ online ? "ONLINE" : "OFFLINE" }}
                </span>
            </span>
            <div class="flex-none items-stretch flex h-14 lg:hidden">
                <NavBarItem @click.prevent="menuNavBarToggle" label="h">
                    <BaseIcon
                        :path="isMenuNavBarActive ? mdiClose : mdiDotsVertical"
                        size="24"
                    />
                </NavBarItem>
            </div>
            <div
                class="absolute w-screen top-14 left-0 bg-gray-50 shadow lg:w-auto lg:items-stretch lg:flex lg:grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-slate-800"
                :class="[isMenuNavBarActive ? 'block' : 'hidden']"
            >
                <div
                    class="max-h-screen-menu overflow-y-auto lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
                >

                    <NavBarMenu>
                        <NavBarItemLabel :label="userName">
                            <UserAvatarCurrentUser
                                class="w-6 h-6 mr-3 inline-flex"
                            />
                        </NavBarItemLabel>

                        <template #dropdown>
                            <NavBarItem route-name="admin.account.info" label="h">
                                <NavBarItemLabel
                                    :icon="mdiAccount"
                                    label="My Profile"
                                />
                            </NavBarItem>

                            <NavBarItem>
                                <NavBarItemLabel
                                    :icon="mdiCogOutline"
                                    label="Settings"
                                />
                            </NavBarItem>
                            <NavBarItem>
                                <NavBarItemLabel
                                    :icon="mdiEmail"
                                    label="Messages"
                                />
                            </NavBarItem>
                            <BaseDivider nav-bar />
                            <NavBarItem>
                                <NavBarItemLabel :icon="mdiLogout" />
                                <Link
                                :class="[
                                    { dark: styleStore.darkMode }
                                ]"
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    class=" text-sm dark:text-white mr-10 text-black"
                                    >Logout</Link
                                >
                            </NavBarItem>
                        </template>
                    </NavBarMenu>
                    <NavBarItem
                        is-desktop-icon-only
                        @click.prevent="toggleLightDark"
                    >
                        <NavBarItemLabel
                            :icon="mdiThemeLightDark"
                            label="Light/Dark"
                            is-desktop-icon-only
                        />
                    </NavBarItem>

                    <NavBarItem is-desktop-icon-only :class="[layoutStore.isRightFilter ? 'mr-8' : '']">
                        <NavBarItemLabel
                            :icon="mdiLogout"
                            is-desktop-icon-only
                        />
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            class="text-sm dark:text-white mr-10 text-black"
                            >Logout</Link
                        >
                    </NavBarItem>
                </div>
            </div>
        </div>
    </nav>
</template>
