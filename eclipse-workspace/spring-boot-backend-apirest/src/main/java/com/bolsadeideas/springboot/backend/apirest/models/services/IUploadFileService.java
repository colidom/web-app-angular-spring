package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadFileService {

	public Resource load(String pictureName) throws MalformedURLException ;
	public String copy(MultipartFile file) throws IOException;
	public boolean delete(String pictureName);
	public Path getPath(String pictureName);
}
