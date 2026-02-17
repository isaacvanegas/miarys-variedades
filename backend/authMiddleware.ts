/**
 * Lógica de Backend (Node.js / Express)
 * 
 * Este archivo demuestra cómo se implementaría el middleware de autenticación
 * solicitado en un servidor Node.js real.
 */

/* 
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Definición de tipos para extender Request
interface AuthRequest extends Request {
  user?: any;
}

export const verifyAdminToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Obtener el header de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // 2. Verificar el token usando la clave secreta
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // 3. Verificar rol de administrador
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso prohibido. Se requieren permisos de administrador.' });
    }

    // 4. Adjuntar usuario a la request y continuar
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};
*/
