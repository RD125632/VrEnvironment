#version 150

in vec3 a_position;

out vec2 texCoord;
out vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main()
{
	position = normalize(a_position);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(a_position,1.0);
}