import { Text as TamaguiText, styled } from 'tamagui'

export const Text = styled(TamaguiText, {
  name: 'Text',
  
  variants: {
    size: {
      xs: {
        fontSize: 12,
        lineHeight: 16,
      },
      sm: {
        fontSize: 14,
        lineHeight: 20,
      },
      base: {
        fontSize: 16,
        lineHeight: 24,
      },
      lg: {
        fontSize: 18,
        lineHeight: 28,
      },
      xl: {
        fontSize: 20,
        lineHeight: 30,
      },
      '2xl': {
        fontSize: 24,
        lineHeight: 32,
      },
      '3xl': {
        fontSize: 30,
        lineHeight: 36,
      },
      '4xl': {
        fontSize: 36,
        lineHeight: 40,
      },
    },
    weight: {
      normal: {
        fontWeight: '400',
      },
      medium: {
        fontWeight: '500',
      },
      semibold: {
        fontWeight: '600',
      },
      bold: {
        fontWeight: '700',
      },
    },
    color: {
      default: {
        color: '$color',
      },
      muted: {
        color: '$gray11',
      },
      primary: {
        color: '$blue10',
      },
      success: {
        color: '$green10',
      },
      warning: {
        color: '$yellow10',
      },
      error: {
        color: '$red10',
      },
      white: {
        color: '$white',
      },
    },
  } as const,

  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
  },
}) 