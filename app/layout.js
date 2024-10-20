import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="max-w-1100 pr-5 pl-5 md:pr-6 md:pl-6 mr-auto ml-auto">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}

export default RootLayout