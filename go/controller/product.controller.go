package controller

import (
	"fmt"

	"github.com/agbad/ecm-g/database"
	"github.com/agbad/ecm-g/model"
	"github.com/agbad/ecm-g/utils"
	"github.com/gofiber/fiber"
)

func GetAllProducts(c *fiber.Ctx) {
	db := database.DBConn
	var products []model.Product
	db.Find(&products)
	resp := fiber.Map{
		"status":  "success",
		"message": "Products retrieved successfully!",
		"data":    products,
	}
	c.Status(201).JSON(resp)
}

func CreateProduct(c *fiber.Ctx) {
	db := database.DBConn
	product := new(model.Product)
	if err := c.BodyParser(product); err != nil {
		c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	errors := utils.ValidateProductStruct(*product)
	if errors != nil {
		c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Request body requires validation",
			"data":    errors,
		})
		return
	}
	db.Create(&product)
	resp := fiber.Map{
		"status":  "success",
		"message": "Product created successfully!",
		"data":    product,
	}
	c.Status(201).JSON(resp)

}

func GetProduct(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var product model.Product
	db.Find(&product.ID, id)
	resp := fiber.Map{
		"status":  "success",
		"message": "Product retrieved successfully!",
		"data":    product,
	}
	c.Status(201).JSON(resp)
}

func UpdateProduct(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var product model.Product
	db.Find(&product.ID, id)
	//
	fmt.Println(product)
	resp := fiber.Map{
		"status":  "success",
		"message": "Product updated successfully!",
		"data":    product,
	}
	c.Status(200).JSON(resp)
}

func DeleteProduct(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn

	var product model.Product
	db.First(&product, id)
	if product.Name == "" {
		resp := fiber.Map{
			"status":  "error",
			"message": "Product not found",
		}
		c.Status(404).JSON(resp)
		return
	}
	db.Delete(&product)
	resp := fiber.Map{
		"status":  "success",
		"message": "Product deleted successfully!",
	}
	c.Status(200).JSON(resp)
}
