package com.mobigen.framework.util.rsa;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;

public class RSAUtil {
	private static final Logger logger =
		LoggerFactory.getLogger(RSAUtil.class);

	public static final String RSA_KEY = "_RSA_KEY_";
	public static final String RSA_MODULUS = "RSAModulus";
	public static final String RSA_EXPONENT = "RSAExponent";

	/**
	 * 개인키, 공개키 쌍을 생성한다
	 * @return
	 */
	public static RSAKeySet generatePrivateKey() {
		RSAKeySet rsaKeySet = null;
		try {
	        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
	        generator.initialize(1024);
	        KeyPair keyPair = generator.genKeyPair();
	        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
	        PublicKey publicKey = keyPair.getPublic();
	        PrivateKey privateKey = keyPair.getPrivate();

	        RSAPublicKeySpec publicSpec = (RSAPublicKeySpec) keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
	        String publicKeyModulus = publicSpec.getModulus().toString(16);
	        String publicKeyExponent = publicSpec.getPublicExponent().toString(16);

	        rsaKeySet = new RSAKeySet(privateKey, publicKeyModulus, publicKeyExponent);
		} catch (Exception e) {
			logger.error("generatePrivateKey Error", e);
		}

		return rsaKeySet;
	}

	/**
	 * 공개키를 포함하는 model을 반환한다.
	 * @param request
	 * @param model
	 * @return
	 */
	public static Model generateRSAModel(final HttpServletRequest request, Model model) {
		RSAKeySet rsaKeySet = generatePrivateKey();
		HttpSession session = request.getSession();

		session.removeAttribute(RSA_KEY);
		session.setAttribute(RSA_KEY, rsaKeySet.getPrivateKey());

		model.addAttribute(RSA_EXPONENT, rsaKeySet.getPublicKeyExponent());
		model.addAttribute(RSA_MODULUS, rsaKeySet.getPublicKeyModulus());

		return model;
	}

	/**
	 * HttpSession에서 privateKey를 추출
	 * @param session
	 * @return
	 */
	public static PrivateKey getPrivateKeyAtSession(HttpSession session) {
		if (session == null)
			return null;

		PrivateKey privateKey = (PrivateKey)session.getAttribute(RSA_KEY);
		return privateKey;
	}

	/**
	 * 주어진 private 키로 값을 decrypt 한다
	 * @param privateKey
	 * @param securedValue
	 * @return
	 */
	public static String decryptRSA(PrivateKey privateKey, String encryptValue) {
		String decryptedValue = "";

		try{
			Cipher cipher = Cipher.getInstance("RSA");
			byte[] encrypteBytes = hexToByteArray(encryptValue);
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			byte[] decrypteBytes = cipher.doFinal(encrypteBytes);
			decryptedValue = new String(decrypteBytes, "utf-8"); // 문자 인코딩 주의.
		} catch(Exception e) {
			logger.info("decryptRSA Exception Error", e);
		}

		return decryptedValue;
	}

	public static byte[] hexToByteArray(String hex) {
		if (hex == null || hex.length() % 2 != 0) {
			return new byte[]{};
		}

		byte[] bytes = new byte[hex.length() / 2];
		for (int i = 0; i < hex.length(); i += 2) {
			byte value = (byte)Integer.parseInt(hex.substring(i, i + 2), 16);
			bytes[(int) Math.floor(i / 2)] = value;
		}
		return bytes;
	}
}
