#version 330 core
out vec4 FragColor;

struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

uniform Material material;


in vec3 Normal;
in vec3 FragPos;

uniform vec3 lightPos;
uniform vec3 objectColor;
uniform vec3 lightColor;
uniform vec3 viewPos;


void main()
{

    vec3 ambient = lightColor * material.ambient;


    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = lightColor * (diff * material.diffuse);

    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 refelctDir = reflect(-lightDir, norm);

    float spec = pow(max(dot(viewDir, refelctDir), 0.0), material.shininess);
    vec3 specular = lightColor * (material.specular * spec);

    vec3 result = ambient + diffuse + specular;

    FragColor =  vec4(result, 1.0);
}