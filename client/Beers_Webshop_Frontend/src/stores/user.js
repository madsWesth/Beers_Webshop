import { writable } from "svelte/store"

export const loggedInStatus = writable(false)

export const cart = writable([])