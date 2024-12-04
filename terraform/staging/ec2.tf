resource "aws_instance" "web" {
  # ap-northeast-1	Noble Numbat	24.04 LTS	amd64	hvm:ebs-ssd-gp3	20241109	ami-0b2cd2a95639e0e5b	hvm
  ami           = "ami-0b2cd2a95639e0e5b"
  instance_type = "t2.micro"
  tags = {
    Name = var.service_name
  }
  key_name        = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.web_sg.name, aws_security_group.ssh_sg.name]
}

resource "aws_key_pair" "deployer" {
  key_name   = "${var.service_name}-key"
  public_key = file("~/.ssh/${var.service_name}.pub")
}