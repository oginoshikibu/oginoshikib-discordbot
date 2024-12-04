variable "service_name" {
  type    = string
  default = "discord-bot-staging"
}

variable "ssh_port" {
  type    = number
  default = 22
}

variable "tcp_port" {
  type    = number
  default = 3000
}