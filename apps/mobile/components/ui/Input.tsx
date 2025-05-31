import { Input as TamaguiInput, styled } from 'tamagui'

export const Input = styled(TamaguiInput, {
  name: 'Input',
  
  variants: {
    size: {
      small: {
        height: 32,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 14,
      },
      medium: {
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 10,
        fontSize: 16,
      },
      large: {
        height: 56,
        paddingHorizontal: 20,
        borderRadius: 12,
        fontSize: 18,
      },
    },
    variant: {
      default: {
        backgroundColor: '$background',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
        placeholderTextColor: '$gray10',
      },
      filled: {
        backgroundColor: '$gray5',
        borderWidth: 0,
        color: '$color',
        placeholderTextColor: '$gray10',
      },
    },
  } as const,

  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
}) 