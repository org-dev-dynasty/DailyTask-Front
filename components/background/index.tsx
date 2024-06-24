import { LinearGradient } from 'expo-linear-gradient';

export function Background({ children } : any) {
  return (
    <LinearGradient
      colors={['#3C0B50', '#2E083D', '#0F0413']}
      locations={[0, 0.28, 1]}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </LinearGradient>
  );
}