package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImpl implements IUploadFileService {

	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);
	private final static String UPLOAD_DIR = "uploads";
	
	@Override
	public Resource load(String pictureName) throws MalformedURLException {
		
		Path fileRoute = getPath(pictureName);
		log.info(fileRoute.toString());
		
		Resource resource = new UrlResource(fileRoute.toUri());
		
		if(!resource.exists() && !resource.isReadable()){
			fileRoute = Paths.get("src/main/resources/static/pictures").resolve("no-user.png").toAbsolutePath();
			resource = new UrlResource(fileRoute.toUri());
			log.error("Could not load image: " + pictureName);
		}
		return resource;
	}

	@Override
	public String copy(MultipartFile file) throws IOException {
		
		String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename().replace(" ", "");
		
		Path fileRoute = getPath(fileName);
		log.info(fileRoute.toString());
		Files.copy(file.getInputStream(), fileRoute);
		
		return fileName;
	}

	@Override
	public boolean delete(String pictureName) {
		if(pictureName != null && pictureName.length() > 0) {
			Path previousPicturePath = Paths.get("uploads").resolve(pictureName).toAbsolutePath();
			File previousPictureFile = previousPicturePath.toFile();

			if(previousPictureFile.exists() && previousPictureFile.canRead()) {
				previousPictureFile.delete();
				return true;
			}
		}
		return false;
	}

	@Override
	public Path getPath(String pictureName) {
		return Paths.get(UPLOAD_DIR).resolve(pictureName).toAbsolutePath();
	}

}
