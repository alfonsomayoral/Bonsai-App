import { Card as TamaguiCard, styled } from 'tamagui'

export const Card = styled(TamaguiCard, {
  name: 'Card',
  
  variants: {
    size: {
      small: {
        padding: 12,
        borderRadius: 8,
      },
      medium: {
        padding: 16,
        borderRadius: 12,
      },
      large: {
        padding: 24,
        borderRadius: 16,
      },
    },
    variant: {
      elevated: {
        backgroundColor: '$background',
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: '$gray5',
      },
    },
  } as const,

  defaultVariants: {
    size: 'medium',
    variant: 'elevated',
  },
}) 