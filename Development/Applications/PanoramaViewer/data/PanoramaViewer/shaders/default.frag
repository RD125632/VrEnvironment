#version 150

uniform sampler2D s_texture;
uniform vec4 diffuseColor;
uniform float textureFactor;
uniform bool useSphereMap;

in vec2 texCoord;
in vec3 normal;
in vec4 position;

out vec4 fragColor;

void main()
{

	if(useSphereMap)
	{
		vec2 texcoord;
		texcoord.y = acos(position.y) / 3.14159265;
		texcoord.x = (atan(position.x, position.z) + 3.14159265) / (2 * 3.14159265);
	
		fragColor.rgb = texture2D(s_texture, texcoord).rgb;
	}
	else
		fragColor.rgb = texture2D(s_texture, texCoord).rgb;
	fragColor.a = 1;
}
