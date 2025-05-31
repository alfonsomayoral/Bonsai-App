import { Button as TamaguiButton, styled } from 'tamagui'

export const Button = styled(TamaguiButton, {
  name: 'Button',
  
  variants: {
    size: {
      small: {
        height: 32,
        paddingHorizontal: 12,
        borderRadius: 8,
      },
      medium: {
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 10,
      },
      large: {
        height: 56,
        paddingHorizontal: 20,
        borderRadius: 12,
      },
    },
    variant: {
      primary: {
        backgroundColor: '$blue10',
        color: '$white',
        pressStyle: {
          backgroundColor: '$blue11',
        },
      },
      secondary: {
        backgroundColor: '$gray5',
        color: '$gray12',
        pressStyle: {
          backgroundColor: '$gray6',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$gray8',
        color: '$gray12',
        pressStyle: {
          backgroundColor: '$gray5',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$gray12',
        pressStyle: {
          backgroundColor: '$gray5',
        },
      },
    },
  } as const,

  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
}) 