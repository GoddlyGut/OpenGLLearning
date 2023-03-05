#version 330 core
out vec4 FragColor;

struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct Light {
    vec3 position;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};
in vec3 Normal;
in vec3 FragPos;

uniform vec3 viewPos;
uniform Material material;
uniform Light light;




void main()
{

    vec3 ambient = light.ambient * material.ambient;


    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * (diff * material.diffuse);

    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 refelctDir = reflect(-lightDir, norm);

    float spec = pow(max(dot(viewDir, refelctDir), 0.0), material.shininess);
    vec3 specular = light.specular * (material.specular * spec);

    vec3 result = ambient + diffuse + specular;

    FragColor =  vec4(result, 1.0);
}