export const metadata = {
  title: 'CIES IITJ - Admin Studio',
  description: 'Content management for CIES IIT Jodhpur website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}

