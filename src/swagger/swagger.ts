export const bookSwagger = {
  '/books': {
    post: {
      tags: ['Books'],
      summary: 'Tạo sách mới',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                description: { type: 'string' },
                category_ids: { type: 'array', items: { type: 'string' } },
              },
              required: ['title', 'author', 'description', 'category_ids'],
            },
          },
        },
      },
      responses: {
        201: { description: 'Tạo sách thành công' },
        400: { description: 'Dữ liệu không hợp lệ' },
      },
    },
    get: {
      tags: ['Books'],
      summary: 'Lấy danh sách sách',
      responses: {
        200: { description: 'Danh sách sách' },
      },
    },
  },
  '/books/{id}': {
    get: {
      tags: ['Books'],
      summary: 'Lấy thông tin sách theo id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: {
        200: { description: 'Thông tin sách' },
        404: { description: 'Không tìm thấy sách' },
      },
    },
    put: {
      tags: ['Books'],
      summary: 'Cập nhật sách',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                description: { type: 'string' },
                category_ids: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Cập nhật thành công' },
        400: { description: 'Dữ liệu không hợp lệ' },
        404: { description: 'Không tìm thấy sách' },
      },
    },
    delete: {
      tags: ['Books'],
      summary: 'Xóa sách',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: {
        200: { description: 'Xóa thành công' },
        404: { description: 'Không tìm thấy sách' },
      },
    },
  },
};

export const swaggerPaths = {
  // BOOKS
  '/books': {
    post: {
      tags: ['Books'],
      summary: 'Tạo sách mới',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                description: { type: 'string' },
                category_ids: { type: 'array', items: { type: 'string' } },
              },
              required: ['title', 'author', 'description', 'category_ids'],
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: { description: 'Tạo sách thành công' },
        400: { description: 'Dữ liệu không hợp lệ' },
      },
    },
    get: {
      tags: ['Books'],
      summary: 'Lấy danh sách sách',
      responses: {
        200: { description: 'Danh sách sách' },
      },
    },
  },
  '/books/{id}': {
    get: {
      tags: ['Books'],
      summary: 'Lấy thông tin sách theo id',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      responses: {
        200: { description: 'Thông tin sách' },
        404: { description: 'Không tìm thấy sách' },
      },
    },
    put: {
      tags: ['Books'],
      summary: 'Cập nhật sách',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                description: { type: 'string' },
                category_ids: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: 'Cập nhật thành công' },
        400: { description: 'Dữ liệu không hợp lệ' },
        404: { description: 'Không tìm thấy sách' },
      },
    },
    delete: {
      tags: ['Books'],
      summary: 'Xóa sách',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: 'Xóa thành công' },
        404: { description: 'Không tìm thấy sách' },
      },
    },
  },
  '/books/paginate': {
    get: {
      tags: ['Books'],
      summary: 'Lấy danh sách sách có phân trang',
      parameters: [
        {
          name: 'page',
          in: 'query',
          required: false,
          schema: { type: 'integer', default: 1 },
          description: 'Trang hiện tại'
        },
        {
          name: 'limit',
          in: 'query',
          required: false,
          schema: { type: 'integer', default: 10 },
          description: 'Số lượng sách mỗi trang'
        }
      ],
      responses: {
        200: {
          description: 'Danh sách sách có phân trang',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  books: { type: 'array', items: { $ref: '#/components/schemas/Book' } },
                  total: { type: 'integer' },
                  totalPages: { type: 'integer' },
                  page: { type: 'integer' },
                  limit: { type: 'integer' }
                }
              }
            }
          }
        }
      }
    }
  },
  // BORROWS
  '/borrows/borrow': {
    post: {
      tags: ['Borrows'],
      summary: 'Mượn sách',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user_id: { type: 'string' },
                book_id: { type: 'string' }
              },
              required: ['user_id', 'book_id']
            }
          }
        }
      },
      responses: {
        201: { description: 'Mượn sách thành công' },
        400: { description: 'Dữ liệu không hợp lệ' }
      }
    }
  },
  '/borrows/return/{id}': {
    put: {
      tags: ['Borrows'],
      summary: 'Trả sách',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                returned_at: { type: 'string', format: 'date-time' }
              },
              required: ['returned_at']
            }
          }
        }
      },
      responses: {
        200: { description: 'Trả sách thành công' },
        400: { description: 'Dữ liệu không hợp lệ' },
        404: { description: 'Không tìm thấy record' }
      }
    }
  },
  // BORROWS
  '/borrows/report/currently-borrowed': {
    get: {
      tags: ['Borrows'],
      summary: 'Lấy danh sách sách đang được mượn (không phân trang)',
      responses: {
        200: {
          description: 'Danh sách sách đang được mượn',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/BorrowRecord' }
              }
            }
          }
        }
      }
    }
  },
  '/borrows/report/currently-borrowed/paginate': {
    get: {
      tags: ['Borrows'],
      summary: 'Lấy danh sách sách đang được mượn (có phân trang)',
      parameters: [
        {
          name: 'page',
          in: 'query',
          required: false,
          schema: { type: 'integer', default: 1 },
          description: 'Trang hiện tại'
        },
        {
          name: 'limit',
          in: 'query',
          required: false,
          schema: { type: 'integer', default: 10 },
          description: 'Số lượng mỗi trang'
        }
      ],
      responses: {
        200: {
          description: 'Danh sách sách đang được mượn (có phân trang)',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  records: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BorrowRecord' }
                  },
                  total: { type: 'integer' },
                  page: { type: 'integer' },
                  limit: { type: 'integer' },
                  totalPages: { type: 'integer' }
                }
              }
            }
          }
        }
      }
    }
  },
  // CATEGORIES
  '/categories': {
    post: {
      tags: ['Categories'],
      summary: 'Tạo danh mục mới',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCategoryDto' }
          }
        }
      },
      responses: {
        201: {
          description: 'Tạo danh mục thành công',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' }
            }
          }
        },
        400: { description: 'Dữ liệu không hợp lệ' }
      }
    },
    get: {
      tags: ['Categories'],
      summary: 'Lấy danh sách danh mục',
      responses: {
        200: {
          description: 'Danh sách danh mục',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Category' }
              }
            }
          }
        }
      }
    }
  },
  '/categories/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Lấy danh mục theo ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        200: {
          description: 'Tìm thấy danh mục',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' }
            }
          }
        },
        404: { description: 'Không tìm thấy danh mục' }
      }
    },
    put: {
      tags: ['Categories'],
      summary: 'Cập nhật danh mục theo ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateCategoryDto' }
          }
        }
      },
      responses: {
        200: {
          description: 'Cập nhật danh mục thành công',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' }
            }
          }
        },
        404: { description: 'Không tìm thấy danh mục' }
      }
    },
    delete: {
      tags: ['Categories'],
      summary: 'Xóa danh mục theo ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        204: { description: 'Xóa danh mục thành công' },
        404: { description: 'Không tìm thấy danh mục' }
      }
    }
  }
};

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Library API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }],
  paths: swaggerPaths,
};

export const userSwagger = {
  '/auth/login': {
    post: {
      tags: ['User'],
      summary: 'Đăng nhập',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'user@example.com', description: 'Email người dùng' },
                password: { type: 'string', example: 'yourpassword', description: 'Mật khẩu' }
              },
              required: ['email', 'password']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Đăng nhập thành công',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: { $ref: '#/components/schemas/User' },
                  token: { type: 'string', description: 'JWT token' }
                }
              }
            }
          }
        },
        401: { description: 'Email hoặc mật khẩu không đúng' },
        403: { description: 'Tài khoản chưa xác thực OTP' }
      }
    }
  },
  '/users/{id}/send-otp': {
    post: {
      tags: ['User'],
      summary: 'Gửi mã OTP cho người dùng',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID người dùng'
        }
      ],
      responses: {
        200: {
          description: 'Đã gửi OTP về email',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Đã gửi OTP về email' }
                }
              }
            }
          }
        },
        404: { description: 'Không tìm thấy người dùng' }
      }
    }
  },
  '/users/{id}/verify-otp': {
    post: {
      tags: ['User'],
      summary: 'Xác thực mã OTP cho người dùng',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID người dùng'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                otp: { type: 'string', example: '123456', description: 'Mã OTP cần xác thực' }
              },
              required: ['otp']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Xác thực OTP thành công',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Xác thực OTP thành công' }
                }
              }
            }
          }
        },
        400: { description: 'OTP không hợp lệ hoặc đã hết hạn' },
        404: { description: 'Không tìm thấy người dùng' }
      }
    }
  },
  '/users': {
    post: {
      tags: ['User'],
      summary: 'Tạo người dùng mới',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserDto' }
          }
        }
      },
      responses: {
        201: {
          description: 'Tạo người dùng thành công và đã gửi mã OTP về email',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: { $ref: '#/components/schemas/User' },
                  message: { type: 'string', example: 'Tạo người dùng thành công. Đã gửi mã OTP về email.' }
                }
              }
            }
          }
        }
      }
    },
    get: {
      tags: ['User'],
      summary: 'Lấy danh sách người dùng',
      parameters: [
        {
          name: 'page',
          in: 'query',
          required: false,
          schema: { type: 'integer', default: 1 },
          description: 'Trang hiện tại'
        },
        {
          name: 'limit',
          in: 'query',
          required: false,
          schema: { type: 'integer', default: 10 },
          description: 'Số lượng mỗi trang'
        }
      ],
      responses: {
        200: {
          description: 'Danh sách người dùng',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  users: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  },
                  total: { type: 'integer', example: 100 },
                  page: { type: 'integer', example: 1 },
                  limit: { type: 'integer', example: 10 }
                }
              }
            }
          }
        }
      }
    }
  },
  '/users/{id}': {
    get: {
      tags: ['User'],
      summary: 'Lấy người dùng theo ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Tìm thấy người dùng',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        404: { description: 'Không tìm thấy người dùng' }
      }
    },
    put: {
      tags: ['User'],
      summary: 'Cập nhật người dùng theo ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateUserDto' }
          }
        }
      },
      responses: {
        200: {
          description: 'Cập nhật người dùng thành công',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        404: { description: 'Không tìm thấy người dùng' }
      }
    },
    delete: {
      tags: ['User'],
      summary: 'Xóa người dùng theo ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        204: { description: 'Xóa người dùng thành công' },
        404: { description: 'Không tìm thấy người dùng' }
      }
    }
  }
};

export const userSchemas = {
  User: {
    type: 'object',
    description: 'Thông tin người dùng',
    properties: {
      _id: { type: 'string', description: 'ID người dùng' },
      name: { type: 'string', description: 'Họ tên' },
      email: { type: 'string', description: 'Email' },
      password: { type: 'string', description: 'Mật khẩu đã hash' },
      role: { type: 'string', description: 'Vai trò (admin, user, ...)' },
      is_verified: { type: 'boolean', description: 'Đã xác thực OTP' },
      created_at: { type: 'string', format: 'date-time', description: 'Ngày tạo tài khoản' }
    }
  },
  CreateUserDto: {
    type: 'object',
    description: 'Dữ liệu tạo người dùng',
    required: ['name', 'email', 'password', 'role'],
    properties: {
      name: { type: 'string', description: 'Họ tên' },
      email: { type: 'string', description: 'Email' },
      password: { type: 'string', description: 'Mật khẩu' },
      role: { type: 'string', example: 'user', description: 'Vai trò' }
    },
    example: {
      name: 'string',
      email: 'string',
      password: 'string',
      role: 'user'
    }
  },
  UpdateUserDto: {
    type: 'object',
    description: 'Dữ liệu cập nhật người dùng',
    properties: {
      name: { type: 'string', description: 'Họ tên' },
      email: { type: 'string', description: 'Email' },
      password: { type: 'string', description: 'Mật khẩu mới' },
      role: { type: 'string', example: 'user', description: 'Vai trò' },
      is_verified: { type: 'boolean', description: 'Đã xác thực OTP' }
    }
  }
};

// Bổ sung schemas cho Category
export const categorySchemas = {
  Category: {
    type: 'object',
    description: 'Thông tin danh mục',
    properties: {
      _id: { type: 'string', description: 'ID danh mục' },
      name: { type: 'string', description: 'Tên danh mục' },
      slug: { type: 'string', description: 'Slug danh mục' }
    }
  },
  CreateCategoryDto: {
    type: 'object',
    description: 'Dữ liệu tạo danh mục',
    required: ['name', 'slug'],
    properties: {
      name: { type: 'string', description: 'Tên danh mục' },
      slug: { type: 'string', description: 'Slug danh mục' }
    },
    example: {
      name: 'Khoa học',
      slug: 'khoa-hoc'
    }
  },
  UpdateCategoryDto: {
    type: 'object',
    description: 'Dữ liệu cập nhật danh mục',
    properties: {
      name: { type: 'string', description: 'Tên danh mục' },
      slug: { type: 'string', description: 'Slug danh mục' }
    }
  }
};

// Bổ sung swaggerPaths cho categories
Object.assign(swaggerPaths, {
  '/categories': {
    post: {
      tags: ['Categories'],
      summary: 'Tạo danh mục mới',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCategoryDto' }
          }
        }
      },
      responses: {
        201: {
          description: 'Tạo danh mục thành công',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' }
            }
          }
        },
        400: { description: 'Dữ liệu không hợp lệ' }
      }
    },
    get: {
      tags: ['Categories'],
      summary: 'Lấy danh sách danh mục',
      responses: {
        200: {
          description: 'Danh sách danh mục',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Category' }
              }
            }
          }
        }
      }
    }
  },
  '/categories/{id}': {
    get: {
      tags: ['Categories'],
      summary: 'Lấy danh mục theo ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        200: {
          description: 'Tìm thấy danh mục',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' }
            }
          }
        },
        404: { description: 'Không tìm thấy danh mục' }
      }
    },
    put: {
      tags: ['Categories'],
      summary: 'Cập nhật danh mục theo ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateCategoryDto' }
          }
        }
      },
      responses: {
        200: {
          description: 'Cập nhật danh mục thành công',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' }
            }
          }
        },
        404: { description: 'Không tìm thấy danh mục' }
      }
    },
    delete: {
      tags: ['Categories'],
      summary: 'Xóa danh mục theo ID',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
      ],
      responses: {
        204: { description: 'Xóa danh mục thành công' },
        404: { description: 'Không tìm thấy danh mục' }
      }
    }
  }
});

// Bổ sung schema cho BorrowRecord
export const borrowRecordSchemas = {
  BorrowRecord: {
    type: 'object',
    properties: {
      _id: { type: 'string', description: 'ID record' },
      user_id: { type: 'object', description: 'Thông tin người mượn' },
      book_id: { type: 'object', description: 'Thông tin sách' },
      borrowed_at: { type: 'string', format: 'date-time', description: 'Thời gian mượn' },
      returned_at: { type: ['string', 'null'], format: 'date-time', description: 'Thời gian trả (null nếu chưa trả)' }
    }
  }
}; 