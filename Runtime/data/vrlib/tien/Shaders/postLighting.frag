#version 330

#include "common.glsl"

uniform sampler2D s_color;
uniform sampler2D s_normal;
uniform sampler2D s_depth;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrixInv;
uniform mat4 modelViewMatrixInv;

out vec4 fragColor;


uniform int lightType;
uniform vec3 lightPosition;
uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightRange;
uniform vec2 windowSize = vec2(1024,1024);

void main()
{
	vec2 texCoord = gl_FragCoord.xy / windowSize;
	vec3 cameraPosition = vec3(0,1.5,-1);

    vec4 image = texture2D( s_color, texCoord );
    float depth = texture2D( s_depth, texCoord ).x;
    vec3 normal = decodeNormal(texture2D( s_normal, texCoord ).xy);

	vec4 viewPos = vec4(texCoord.xy*2.0-1.0, depth*2.0-1.0, 1);
	vec4 tempPos = modelViewMatrixInv * projectionMatrixInv * viewPos;
	vec3 position = tempPos.xyz / tempPos.w;
    
	float diffuse = 0;
	float ambient = 0.1;
	float specular = 0;

	switch(lightType) // directional light
	{
		case 0: // directional light
			diffuse = max(0, dot(normalize(normal), normalize(vec3(1,1,1))));
			break;	
		case 1: // point light
			ambient = 0;


			vec3 lightDir = lightPosition - position.xyz;
			float len = length(lightDir);
//		    if(len > lightRange)
//				discard;
			float distanceFac = pow(1 - (len / lightRange), 1.0);
			diffuse = distanceFac * clamp(dot(normalize(normal), normalize(lightDir)), 0, 1);
			
			break;	
		case 2: // spotlight
		
			break;	
		default:
			fragColor = vec4(0,1,1,1);
			break;
	}





//	distanceFac = 1;
//	lightDir = vec3(1,1,1);

 //   normal = normalize(normal);
 //   lightDir = normalize(lightDir);
    
//    vec3 eyeDir = normalize(cameraPosition-position.xyz);
 //   vec3 vHalfVector = normalize(lightDir.xyz+eyeDir);
    
    //fragColor = distanceFac * (lightColor * max(dot(normal,lightDir),0.15) * image);// + pow(max(dot(normal,vHalfVector),0.0), 100) * 1.5);
	fragColor = lightColor * (diffuse + ambient + specular) * image;
	fragColor.a = 1;

//	if(lightType == 1)
//		fragColor.rgb = lightColor.xyz;


}
