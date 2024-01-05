export type YtVideoType = {
  id: number
  ytId: string
  name: string
  pic: string
}

export type CollectionType = {
  id: number
  name: string
  videoData: YtVideoType[]
}

export type CollectionListType = Pick<CollectionType, 'id' | 'name'>[]
