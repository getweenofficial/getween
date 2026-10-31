export const metadata = {
  title: 'getween - 로테이션 소개팅',
  description: '새로운 인연을 만나는 로테이션 소개팅 신청',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, backgroundColor: '#fdfdfd' }}>
        {children}
      </body>
    </html>
  )
}
