{ pkgs ? import <nixpkgs> {}
}:

let nodejs = pkgs.nodejs-6_x.overrideDerivation(args: {
  name = "nodejs-6.9.1";
  src = pkgs.fetchurl {
    url = "https://nodejs.org/download/release/v6.9.1/node-v6.9.1.tar.xz";
    sha256 = "0bdd8d1305777cc8cd206129ea494d6c6ce56001868dd80147aff531d6df0729";
  };
});

in

pkgs.stdenv.mkDerivation rec {
  name = "env";
  # Mandatory boilerplate for buildable env
  env = pkgs.buildEnv { name = name; paths = buildInputs; };
  builder = builtins.toFile "builder.sh" ''
    source $stdenv/setup; ln -s $env $out
  '';
  # Customizable development requirements
  buildInputs = [
    (pkgs.yarn.override { inherit nodejs; })
  ];
  # Customizable development shell setup
  shellHook = ''
    export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
  '';
}
