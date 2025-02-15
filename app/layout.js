import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"
import { AuthProvider } from "./context/AuthContext"

const RootLayout = ({ children }) => {
  return (
    <html lang="ja">
      <body className="max-w-1100 pr-5 pl-5 md:pr-6 md:pl-6 mr-auto ml-auto">
        <AuthProvider>
          <Header/>
            {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout