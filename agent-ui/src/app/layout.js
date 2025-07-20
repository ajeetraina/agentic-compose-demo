export const metadata = {
  title: 'AI Agents Hackathon Recommender',
  description: 'Get personalized hackathon project recommendations based on your GitHub profile',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
