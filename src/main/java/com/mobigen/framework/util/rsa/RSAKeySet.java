package com.mobigen.framework.util.rsa;

import java.security.PrivateKey;

public class RSAKeySet {
	private PrivateKey privateKey;
	private String publicKeyModulus;
	private String publicKeyExponent;

	public PrivateKey getPrivateKey() {
		return privateKey;
	}
	public String getPublicKeyModulus() {
		return publicKeyModulus;
	}
	public String getPublicKeyExponent() {
		return publicKeyExponent;
	}

	public RSAKeySet(PrivateKey privateKey, String publicKeyModulus, String publicKeyExponent) {
		this.privateKey = privateKey;
		this.publicKeyModulus = publicKeyModulus;
		this.publicKeyExponent = publicKeyExponent;
	}

}
