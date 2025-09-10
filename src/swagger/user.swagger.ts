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