# Lumina WSL2 Notes

This project builds and runs cleanly in WSL2 (Ubuntu 26.04) on the host RTX 5070 laptop.

## One-time WSL prep (if you see native module errors like lightningcss)
```bash
cd /mnt/c/Users/Josep/nextlify
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

This pulls Linux x64-gnu prebuilts for SWC, lightningcss, etc. (mixed Windows node_modules from prior PowerShell runs cause the mismatch).

## Verified
- Node 20 + npm 10.7 in this env
- GPU passthrough: nvidia-smi shows RTX 5070 (driver 610.43/47, CUDA 13.3 UMD)
- Full production build succeeds
- Dev server: next dev works with Turbopack

## Local synergy
- Pair with ComfyUI (models shared via extra_model_paths) for Phase 2 visuals.
- Ollama Linux: `curl -fsSL https://ollama.com/install.sh | sh` then `ollama serve` + pull coder models for agent work while Lumina runs.
- Use `build-j24` style (export MAKEFLAGS=-j24) for any native compiles.

Everything here is ready for the next phase work or `vercel deploy`.
