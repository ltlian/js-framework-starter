import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

const localStorageKey = 'things'
const fakeCacheMaxSleep = 800

export async function getThingAsync(id: string): Promise<ThingDescription | null> {
  await fakeNetwork(`thing:${id}`)
  let things = await localforage.getItem<ThingDescription[]>(localStorageKey)
  if (things === null) {
    return null
  }

  let thing = things.find((thing) => thing.id === id)
  return thing ?? null
}

export async function getThingsAsync(query?: string | null): Promise<ThingDescription[]> {
  await fakeNetwork(`getThings:${query}`)
  let things = await localforage.getItem<ThingDescription[]>(localStorageKey)
  if (!things) {
    return []
  }

  if (query) {
    things = matchSorter(things, query, { keys: ['id', 'name'] })
  }

  return things.sort(sortBy('-favorite', 'name', 'createdAt'))
}

export async function createThingAsync(): Promise<ThingDescription> {
  let id = Math.random().toString(36).substring(2, 9)
  let thing: ThingDescription = {
    id,
    createdAt: Date.now(),
    name: '',
    favorite: false,
    notes: '',
    thumbnail: '',
    twitter: '',
  }

  let things = await getThingsAsync()
  things.unshift(thing)
  await set(things)
  return thing
}

export async function updateThing(id: string | undefined, updates: any) {
  await fakeNetwork()
  let things = await localforage.getItem<ThingDescription[]>(localStorageKey)
  if (things === null) {
    throw new Error('Localstorage error')
  }

  let thing = things.find((thing) => thing.id === id)
  if (!thing) throw new Error('No thing found for ' + id)
  Object.assign(thing, updates)
  await set(things)
  return thing
}

export async function deleteThing(id: string | undefined) {
  let things = await localforage.getItem<ThingDescription[]>(localStorageKey)
  if (things === null) {
    return false
  }

  let index = things.findIndex((thing) => thing.id === id)
  if (index > -1) {
    things.splice(index, 1)
    await set(things)
    return true
  }

  return false
}

const set = (things: ThingDescription[]) => localforage.setItem(localStorageKey, things)

let fakeCache: Map<string, boolean> = new Map()

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = new Map()
    return
  }

  if (fakeCache.has(key)) {
    return
  }

  fakeCache.set(key, true)

  return new Promise((res) => {
    setTimeout(res, Math.random() * fakeCacheMaxSleep)
  })
}
