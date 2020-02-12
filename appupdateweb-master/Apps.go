package main

import (
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}

func main(){
	router:=gin.Default()
	router.Use(Cors())
	router.Static("/static","static")
	router.LoadHTMLGlob("./templates/*")
	router.GET("/", func(c *gin.Context) {
		c.HTML(200,"index.html",nil)
	})
	router.GET("index.html", func(c *gin.Context) {
		c.HTML(200,"index.html",nil)
	})
	router.GET("project.html", func(c *gin.Context) {
		c.HTML(200,"project.html",nil)
	})
	router.GET("versions1.html", func(c *gin.Context) {
		c.HTML(200,"versions1.html",nil)
	})
	router.GET("addapp.html", func(c *gin.Context) {
		c.HTML(200,"addapp.html",nil)
	})
 	router.Run(":8081")
}
