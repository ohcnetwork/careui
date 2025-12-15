import React from 'react'
import { type ComponentDoc } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const avatarDoc: ComponentDoc = {

    id: 'avatar',
    name: 'Avatar',
    description: 'An image element with a fallback for representing the user.',
    installation: {
      cli: 'npx shadcn@latest add avatar',
      manual: 'Copy and paste the avatar component source code into your project.'
    },
    usage: `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}`,
    preview: {
      code: `<div className="flex flex-row flex-wrap items-center gap-12">
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="rounded-lg">
    <AvatarImage
      src="https://github.com/evilrabbit.png"
      alt="@evilrabbit"
    />
    <AvatarFallback>ER</AvatarFallback>
  </Avatar>
  <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://github.com/maxleiter.png"
        alt="@maxleiter"
      />
      <AvatarFallback>LR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage
        src="https://github.com/evilrabbit.png"
        alt="@evilrabbit"
      />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
  </div>
</div>`,
      component: React.createElement('div', { className: 'flex flex-row flex-wrap items-center gap-12' },
        React.createElement(Avatar, {},
          React.createElement(AvatarImage, { src: 'https://github.com/shadcn.png', alt: '@shadcn' }),
          React.createElement(AvatarFallback, {}, 'CN')
        ),
        React.createElement(Avatar, { className: 'rounded-lg' },
          React.createElement(AvatarImage, { src: 'https://github.com/evilrabbit.png', alt: '@evilrabbit' }),
          React.createElement(AvatarFallback, {}, 'ER')
        ),
        React.createElement('div', { className: '*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale' },
          React.createElement(Avatar, {},
            React.createElement(AvatarImage, { src: 'https://github.com/shadcn.png', alt: '@shadcn' }),
            React.createElement(AvatarFallback, {}, 'CN')
          ),
          React.createElement(Avatar, {},
            React.createElement(AvatarImage, { src: 'https://github.com/maxleiter.png', alt: '@maxleiter' }),
            React.createElement(AvatarFallback, {}, 'LR')
          ),
          React.createElement(Avatar, {},
            React.createElement(AvatarImage, { src: 'https://github.com/evilrabbit.png', alt: '@evilrabbit' }),
            React.createElement(AvatarFallback, {}, 'ER')
          )
        )
      )
    }
}
