'use client'

import { Gallery, Item } from 'react-photoswipe-gallery'
import { TweetMediaVideo } from './tweet-media-video.js'
import { EnrichedQuotedTweet, EnrichedTweet, getMediaUrl } from '../utils.js'
import { MediaImg } from './media-img.js'
import { Fragment } from 'react'
import clsx from 'clsx'

import s from './tweet-media.module.css'
import 'photoswipe/dist/photoswipe.css'

type Props = {
  tweet: EnrichedTweet | EnrichedQuotedTweet
  skeleton?: {
    width: string | undefined
    paddingBottom: string
  }
}

export const TweetGallery = ({ tweet, skeleton }: Props) => {
  const onBeforeOpen = (pswpInstance: any) => {
    pswpInstance.on('beforeOpen', () => {
      const ds = pswpInstance?.options?.dataSource
      if (Array.isArray(ds)) {
        for (let idx = 0, len = ds.length; idx < len; idx++) {
          const item = ds[idx]
          const img = new Image()
          img.onload = () => {
            item.width = img.naturalWidth
            item.height = img.naturalHeight
            pswpInstance?.refreshSlideContent(idx)
          }
          img.src = item.src as string
        }
      }
    })
  }

  return (
    <Gallery onBeforeOpen={onBeforeOpen}>
      {tweet.mediaDetails?.map((media) => (
        <Fragment key={media.media_url_https}>
          {media.type === 'photo' ? (
            <div key={media.media_url_https} className={clsx(s.mediaContainer)}>
              <div className={s.skeleton} style={skeleton} />
              <Item
                original={getMediaUrl(media, 'large')}
                thumbnail={getMediaUrl(media, 'medium')}
              >
                {({ ref, open }) => (
                  <img
                    src={getMediaUrl(media, 'small')}
                    alt={media.ext_alt_text || 'Image'}
                    className={s.image}
                    ref={ref as React.MutableRefObject<HTMLImageElement>}
                    onClick={open}
                  />
                )}
              </Item>
            </div>
          ) : (
            <div key={media.media_url_https} className={s.mediaContainer}>
              <div className={s.skeleton} style={skeleton} />
              <TweetMediaVideo tweet={tweet} media={media} />
            </div>
          )}
        </Fragment>
      ))}
    </Gallery>
  )
}
