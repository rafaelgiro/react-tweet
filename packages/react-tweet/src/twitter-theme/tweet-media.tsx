import clsx from 'clsx'
import {
  type EnrichedTweet,
  type EnrichedQuotedTweet,
  getMediaUrl,
} from '../utils.js'
import { MediaDetails } from '../api/index.js'
import type { TwitterComponents } from './types.js'

import s from './tweet-media.module.css'
import { TweetGallery } from './tweet-gallery'
import { MediaImg } from './media-img.jsx'

const getSkeletonStyle = (media: MediaDetails, itemCount: number) => {
  let paddingBottom = 56.25 // default of 16x9

  // if we only have 1 item, show at original ratio
  if (itemCount === 1)
    paddingBottom =
      (100 / media.original_info.width) * media.original_info.height

  // if we have 2 items, double the default to be 16x9 total
  if (itemCount === 2) paddingBottom = paddingBottom * 2

  return {
    width: media.type === 'photo' ? undefined : 'unset',
    paddingBottom: `${paddingBottom}%`,
  }
}

type Props = {
  tweet: EnrichedTweet | EnrichedQuotedTweet
  components?: TwitterComponents
  quoted?: boolean
}

export const TweetMedia = ({ tweet, quoted, components }: Props) => {
  const length = tweet.mediaDetails?.length ?? 0
  const Img = components?.MediaImg ?? MediaImg

  return (
    <div className={clsx(s.root, !quoted && s.rounded)}>
      <div
        className={clsx(
          s.mediaWrapper,
          length > 1 && s.grid2Columns,
          length === 3 && s.grid3,
          length > 4 && s.grid2x2
        )}
      >
        <TweetGallery tweet={tweet} />
      </div>
    </div>
  )
}
