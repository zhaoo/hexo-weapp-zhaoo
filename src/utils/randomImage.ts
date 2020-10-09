import { getAllGalleries } from '@/utils/api'

const fetchImages = async () => {
  const data = await getAllGalleries()
  return data.images
}

const getRandomArr = (arr, count) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

export default async function randomImage(num: number) {
  const allImages = await fetchImages()
  return getRandomArr(allImages, num)
}