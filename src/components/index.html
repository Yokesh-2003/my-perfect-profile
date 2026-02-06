import { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    let animationFrameId: number;
    let vertexBuffer: WebGLBuffer | null;
    let shaderProgram: WebGLProgram | null;
    let uResolution: WebGLUniformLocation | null;
    let uTime: WebGLUniformLocation | null;

    const setup = async () => {
      const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = await fetch('/shaders/fluid.frag').then(res => res.text());

      const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.compileShader(vertexShader);

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(fragmentShader);

      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
        return;
      }

      shaderProgram = gl.createProgram()!;
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);

      uResolution = gl.getUniformLocation(shaderProgram, 'u_resolution');
      uTime = gl.getUniformLocation(shaderProgram, 'u_time');

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const position = gl.getAttribLocation(shaderProgram, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      render(0);
    };

    const render = (time: number) => {
        if (!gl || !shaderProgram) return;
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, time * 0.001);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationFrameId = requestAnimationFrame(render);
    };


    const handleResize = () => {
      if (canvas && gl) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    setup();
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (gl) {
        gl.deleteProgram(shaderProgram);
        gl.deleteBuffer(vertexBuffer);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default FluidBackground;
